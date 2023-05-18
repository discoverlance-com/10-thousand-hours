<script lang="ts">
	import { allTasks } from '$lib/stores/taskStore';
	import { browser } from '$app/environment';
	import { quintOut } from 'svelte/easing';
	import { crossfade, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Card from '$components/Card.svelte';

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
</script>

<svelte:head>
	<title>Home - 10 thousand hours</title>
	<meta
		name="description"
		content="Tool to help you make progress each day by practicing each learning task for 10,000 hours."
	/>
</svelte:head>

<section>
	<h1 class="text-4xl md:text-5xl font-bold text-center gradient-heading">Welcome</h1>

	{#if $allTasks.length >= 1}
		<div class="flex justify-end my-2">
			<button
				class="btn variant-filled-primary"
				on:click={() => {
					if (confirm('Are you sure you want to delete all learning items?')) {
						allTasks.reset();
					}
				}}>Delete All</button
			>
		</div>
	{/if}

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
		{/if}
		<div class="grid md:grid-cols-3 grid-cols-2 gap-8">
			{#each $allTasks as task (task.id)}
				<div in:receive={{ key: task.id }} out:send={{ key: task.id }} animate:flip>
					<Card>
						<span slot="title">
							<h2>{task.title}</h2>
						</span>

						<p class="badge variant-filled-success">
							Time Spent: {task.total_minutes_spent / 60} / {task.total_minutes_left / 60 + ' '}
							<span>(hours)</span>
						</p>
						<span slot="footer">
							<div class="btn-group variant-filled">
								<a href={'/tasks/create/' + task.id}>Update</a>
								<button
									class="bg-warning-600 hover:bg-warning-400"
									on:click={() => {
										if (confirm('Are you sure?')) {
											allTasks.remove(task.id);
										}
									}}>Delete</button
								>
							</div>
						</span>
					</Card>
				</div>
			{/each}
		</div>
	</div>
</section>
