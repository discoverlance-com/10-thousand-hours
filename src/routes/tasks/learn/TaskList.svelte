<script lang="ts">
	import { allTasks } from '$lib/stores/taskStore';
	import { flip } from 'svelte/animate';
	import Card from '$components/Card.svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade, fade } from 'svelte/transition';
	import type { Task } from '$lib/Task';

	type DraggingEvent = DragEvent & {
		currentTarget: EventTarget & HTMLDivElement;
	};

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: typeof params.duration === 'number' ? params.duration : 100,
				delay: params.delay || 0,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	let currentTask: Task | undefined = undefined;

	function handleDragStart(event: DraggingEvent) {
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
			event.dataTransfer.setData('taskId', event.currentTarget.getAttribute('data-id') || '');
		}
	}

	function handleDragEnd(event: DraggingEvent) {}

	function handleDragDrop(event: DraggingEvent) {
		if (event.dataTransfer) {
			const taskId = event.dataTransfer.getData('taskId');
			if (taskId) {
				currentTask = $allTasks.find((t) => t.id === taskId);
			}
		}
	}

	function handleDragEnter(event: DraggingEvent) {
		if (event.currentTarget.classList.contains('bg-primary-50')) {
			event.currentTarget.classList.remove('bg-primary-50');
			event.currentTarget.classList.add('bg-success-50');
		}
	}

	function handleDragLeave(event: DraggingEvent) {
		console.log('Drag Left', event.dataTransfer);
		if (event.currentTarget.classList.contains('bg-success-50')) {
			event.currentTarget.classList.remove('bg-success-50');
			event.currentTarget.classList.add('bg-primary-50');
		}
	}

	function handleDragOver(event: DraggingEvent) {}
</script>

<div class="grid md:grid-cols-3 grid-cols-2 gap-8">
	{#each $allTasks
		.filter((t) => !t.isCompleted)
		.filter((t) => t.id !== currentTask?.id) as task (task.id)}
		<div
			animate:flip
			in:receive={{ key: task.id }}
			out:send={{ key: task.id, duration: 100, delay: 0 }}
			class="cursor-pointer max-w-xs"
			draggable="true"
			data-id={task.id}
			on:dragstart={handleDragStart}
			on:dragend={handleDragEnd}
		>
			<Card>
				<span slot="title">
					<h2 class="text-center">{task.title}</h2>
				</span>
				<span slot="footer">
					<button class="btn variant-filled">Learn</button>
				</span>
			</Card>
		</div>
	{/each}
</div>

{#if currentTask}
	<h3 class="mt-4 text-lg text-center" transition:fade>
		You have decided to study <span class="underline font-bold">{currentTask.title}</span>
	</h3>
{/if}

<!-- Drag and Drop box -->
<div class="flex justify-center mt-16">
	<div
		class="border-primary-600 border-2 border-dashed rounded-3xl w-96 h-64 bg-primary-50"
		on:drop|preventDefault={handleDragDrop}
		on:dragenter={handleDragEnter}
		on:dragleave={handleDragLeave}
		on:dragover|preventDefault={handleDragOver}
	>
		{#if currentTask}
			<div class="flex items-center justify-center h-full">
				<Card>
					<span slot="title">
						<h2 class="text-center">{currentTask.title}</h2>
					</span>

					<span slot="footer">Set the timer to begin</span>
				</Card>
			</div>
		{:else}
			<p class="text-primary-400 flex items-center justify-center h-full">
				Drop a task here to begin learning
			</p>
		{/if}
	</div>
</div>
