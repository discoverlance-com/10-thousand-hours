<script lang="ts">
	import { allTasks } from '$lib/stores/taskStore';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	function handleSubmit() {
		allTasks.add(task);
		success = true;
		setTimeout(() => {
			goto('/');
		}, 1500);
	}

	function handleUpdateSubmit() {
		if (taskId) {
			allTasks.edit(taskId, task);
			success = true;
			setTimeout(() => {
				goto('/');
			}, 1500);
		}
	}

	let task = '';
	let success = false;

	let taskSlug = $page.params.path.split('/')[0];

	$: taskId = $allTasks.find((t) => t.id === taskSlug)?.id;
	$: pageTitle = taskId ? 'Update' : 'Create';

	onMount(() => {
		if (taskId) {
			task = $allTasks.find((t) => t.id === taskId)?.title || '';
		}
	});
</script>

<svelte:head>
	<title>Create Task - 10 thousand hours</title>
	<meta name="description" content={taskId ? 'Update ' : 'Create ' + 'a learning task'} />
</svelte:head>

<section>
	<h1 class="text-4xl font-bold text-center gradient-heading">{pageTitle} task</h1>
	<p class="text-center mt-2">{pageTitle} a learning item</p>

	{#if success}
		<aside class="alert variant-ghost-success mt-2" transition:fade>
			<div>
				<span class="material-icons"> task_alt </span>
			</div>
			<div class="alert-message">
				<h3 class="h3">Done</h3>
				<p>Task, {task} successfully updated.</p>
			</div>
		</aside>
	{/if}

	{#if taskId}
		<div class="max-w-md mx-auto mt-8">
			<form on:submit|preventDefault={handleUpdateSubmit}>
				<label class="label">
					<span>Title</span>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">
							<span class="material-icons">task</span>
						</div>
						<input type="text" class="" bind:value={task} maxlength="100" required />
					</div>
				</label>
				<div>
					<button class="btn variant-filled mt-6">Update</button>
				</div>
			</form>
		</div>
	{:else}
		<div class="max-w-md mr-auto mt-8">
			<form on:submit|preventDefault={handleSubmit}>
				<label class="label">
					<span>Title</span>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">
							<span class="material-icons">task</span>
						</div>
						<input
							type="text"
							class=""
							placeholder="Enter title of what you want to learn..."
							bind:value={task}
							maxlength="100"
							required
						/>
					</div>
				</label>

				<div>
					<button class="btn variant-filled mt-6">Create</button>
				</div>
			</form>
		</div>
	{/if}
</section>