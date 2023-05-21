<script lang="ts">
	import { fade } from 'svelte/transition';
	import Timer from './Timer.svelte';

	export let currentTask: string;

	let minutes = 25;
	let startTimer = false;

	function handleSubmit() {
		if (!currentTask) {
			alert('Add a task to start');
			return;
		}
		startTimer = true;
	}

	function handleReset() {
		minutes = 25;
		startTimer = false;
	}

	function handleTimerCompleted() {
		startTimer = false;
	}
</script>

<div class="mt-6 w-96 mx-auto">
	<!-- Timer -->
	<form
		on:submit|preventDefault={handleSubmit}
		class="flex-col flex gap-4 items-center justify-between"
	>
		{#if startTimer}
			<div transition:fade>
				<Timer {minutes} on:completed={handleTimerCompleted} currentTaskId={currentTask} />
			</div>
		{:else}
			<div class="flex items-center" transition:fade>
				<label for="minutes" class="flex gap-2 items-center">
					<input
						id="minutes"
						min="5"
						type="number"
						class="input w-16"
						bind:value={minutes}
						required
					/>
					<span>(minutes)</span>
				</label>
			</div>
		{/if}

		<!-- Timer Controls -->
		<div class="space-x-8 mt-2">
			{#if !startTimer}
				<button class="btn variant-filled" type="submit">Start</button>
			{/if}
			<button class="btn variant-filled-warning" type="button" on:click={handleReset}>Reset</button>
		</div>
	</form>
</div>
