<script lang="ts">
	import { browser } from '$app/environment';
	import Card from '$components/Card.svelte';
	import type { Task } from '$lib/Task';
	import { allTasks } from '$lib/stores/taskStore';
	import { fade, fly } from 'svelte/transition';

	let totalCompletedHours = $allTasks.reduce(
		(prev, current) => {
			return {
				minutes: prev.minutes + current.total_minutes_spent,
				hours: prev.hours + Math.round(current.total_minutes_spent / 60)
			};
		},
		{ minutes: 0, hours: 0 }
	);

	let tasksLength = $allTasks.length;
	let totalCompletedTasks = $allTasks.filter((t) => t.isCompleted)?.length || 0;
	let sumOfTasksMinutesSpent = $allTasks.reduce(
		(prev, current) => prev + current.total_minutes_spent,
		0
	);
	let mostWorkedOnTask =
		sumOfTasksMinutesSpent < 1
			? 'None'
			: $allTasks.reduce((prev, current) => {
					return prev.total_minutes_spent > current.total_minutes_spent ? prev : current;
			  }, {} as Task).title;
</script>

<svelte:head>
	<title>Stats - 10 thousand hours</title>
	<meta name="description" content="View stats of your progress" />
</svelte:head>

<section>
	<h1 class="text-4xl font-bold text-center gradient-heading">Statistics and Insights</h1>
	<p class="mt-2 text-center">Find meaningful insights and analytics about your study so far</p>

	{#if browser && $allTasks.length < 1}
		<aside class="alert variant-ghost mt-8">
			<div>
				<span class="material-icons"> battery_alert </span>
			</div>
			<div class="alert-message">
				<h3 class="h3">Get Started</h3>
				<p>There are no tasks to get insights from, please add a task to see stats here.</p>
			</div>
			<div class="alert-actions">
				<a class="btn variant-filled-primary" href="/tasks/create">Add Task</a>
			</div>
		</aside>
	{:else}
		<div class="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
			<Card>
				<span slot="title">
					<h2>Total Completed Hours</h2>
				</span>
				<div class="flex gap-4 text-xl font-medium justify-center items-center">
					<span class="material-icons">timelapse</span>
					{#key mostWorkedOnTask}
						<span in:fly={{ y: -20 }}>{totalCompletedHours.hours} hours</span>
						<span in:fly={{ y: -20 }}>{totalCompletedHours.minutes} minutes</span>
					{/key}
				</div>
			</Card>

			<Card>
				<span slot="title">
					<h2>Total Completed Tasks</h2>
				</span>
				<div class="flex gap-4 text-xl font-medium justify-center items-center">
					<span class="material-icons">done_all</span>
					{#key tasksLength}
						<span in:fly={{ y: -20 }}>{totalCompletedTasks} / {tasksLength}</span>
					{/key}
				</div>
			</Card>

			<Card>
				<span slot="title">
					<h2>Most Worked on Task</h2>
				</span>
				<div class="flex gap-4 text-xl font-medium justify-center items-center">
					<span class="material-icons">handyman</span>
					{#key mostWorkedOnTask}
						<span in:fly={{ y: -20 }}>{mostWorkedOnTask}</span>
					{/key}
				</div>
			</Card>
		</div>
	{/if}
</section>
