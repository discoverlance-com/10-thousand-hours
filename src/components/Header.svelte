<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	function goBack() {
		if ($page.url.pathname !== '/') {
			window.history.back();
		} else {
			goto('/');
		}
	}
</script>

<div class="sticky">
	<AppBar>
		<svelte:fragment slot="lead">
			<button class="flex items-center" on:click={goBack}>
				<span class="material-icons"> arrow_back </span>
			</button>
		</svelte:fragment>
		<span class="font-header">10 Thousand Hours</span>
		<svelte:fragment slot="trail" />
	</AppBar>
</div>
