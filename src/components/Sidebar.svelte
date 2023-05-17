<script lang="ts">
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	const selected = derived(page, ($page) => $page.url.pathname);
</script>

<AppRail {selected}>
	<AppRailTile label="Home" href="/">
		<span class="material-icons">dashboard</span>
	</AppRailTile>
	<AppRailTile label="Add Task" href="/tasks/create">
		<span class="material-icons">add_task</span>
	</AppRailTile>
	<AppRailTile label="Stats" href="/stats">
		<span class="material-icons">insights</span>
	</AppRailTile>
</AppRail>
