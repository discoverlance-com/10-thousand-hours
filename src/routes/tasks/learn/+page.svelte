<script lang="ts">
	import { allTasks } from '$lib/stores/taskStore';
	import { browser } from '$app/environment';

	import Pomodoro from './Pomodoro.svelte';
	import TaskList from './TaskList.svelte';

	let currentTask: string;
</script>

<svelte:head>
	<title>Learn - 10 thousand hours</title>
	<meta name="description" content="Create a new task" />
</svelte:head>

<section class="pb-16">
	<h1 class="text-4xl font-bold text-center gradient-heading">Start Learning</h1>

	<p class="mt-2 text-center">
		Drag a task into the learning box below or click learn on a task to start learning
	</p>

	<div class="mt-8">
		{#if browser && $allTasks.length < 1}
			<aside class="alert variant-ghost">
				<div>
					<span class="material-icons"> battery_alert </span>
				</div>
				<div class="alert-message">
					<h3 class="h3">Get Started</h3>
					<p>Please add a task to begin your learning journey</p>
				</div>
				<div class="alert-actions">
					<a class="btn variant-filled-primary" href="/tasks/create">Add Task</a>
				</div>
			</aside>
		{:else}
			<TaskList
				on:taskAdded={(event) => {
					currentTask = event.detail.currentTask;
				}}
			/>
		{/if}

		<!-- Timer -->
		<Pomodoro {currentTask} />
	</div>
</section>
