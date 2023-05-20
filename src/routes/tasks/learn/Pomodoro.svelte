<script lang="ts">
	let minutes = 25;

	function handleSubmit() {
		console.log('Submitted');
	}

	function handleReset() {}
</script>

<div class="mt-6 w-96 mx-auto">
	<!-- Timer -->
	<form
		on:submit|preventDefault={handleSubmit}
		class="flex-col flex gap-4 items-center justify-between"
	>
		<div class="flex items-center">
			<label for="minutes" class="">
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
		<!-- Timer Controls -->
		<div class="space-x-8">
			<button class="btn variant-filled" type="submit">Start</button>
			<button class="btn variant-filled-warning" type="button" on:click={handleReset}>Reset</button>
		</div>
	</form>
</div>
