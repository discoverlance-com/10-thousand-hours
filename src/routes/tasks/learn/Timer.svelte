<script lang="ts">
	import { allTasks } from '$lib/stores/taskStore';
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let currentTaskId: string;

	export let minutes: number;

	type Timer = { hours: number; minutes: number; seconds: number };

	let timer: Timer = { minutes: 0, hours: 0, seconds: 0 };

	const endDate = new Date();
	endDate.setMinutes(endDate.getMinutes() + minutes);

	onMount(() => {
		// calculate time spent
		const timeSpentInterval = setInterval(() => {
			allTasks.updateTimer(currentTaskId);
		}, 1000 * 60);

		// update timer
		const timeout = setInterval(() => {
			const startDate = new Date().getTime();
			const timeLeft = endDate.getTime() - startDate;

			if (timeLeft < 0) {
				// Signal Completion
				dispatch('completed');
				return;
			}
			const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
			timer = { minutes, seconds, hours };
		}, 1000);

		return () => {
			clearInterval(timeout);
			clearInterval(timeSpentInterval);
		};
	});
</script>

<div class="w-full flex justify-center gap-4">
	{#if timer.hours >= 1}
		<span class="bg-surface-200 text-3xl py-2 px-4 rounded-3xl">
			{#key timer.hours}
				<span in:fly={{ y: -20, duration: 300 }} class="inline-block"> {timer.hours}</span>
			{/key}
		</span>
	{/if}

	<span in:fly={{ y: -20, duration: 300 }} class=" bg-surface-200 text-3xl py-2 px-4 rounded-3xl">
		{#key timer.minutes}
			<span in:fly={{ y: -20, duration: 300 }} class="inline-block"> {timer.minutes}</span>
		{/key}</span
	>

	<span in:fly={{ y: -20, duration: 300 }} class=" bg-surface-200 text-3xl py-2 px-4 rounded-3xl">
		{#key timer.seconds}
			<span in:fly={{ y: -20, duration: 300 }} class="inline-block"> {timer.seconds}</span>
		{/key}</span
	>
</div>
