<script lang="ts">
	// Skeleton theme:
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import Header from '$components/Header.svelte';
	import Sidebar from '$components/Sidebar.svelte';
	import PageTransition from '$components/PageTransition.svelte';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
</script>

<div class="max-w-7xl mx-auto relative">
	<Header />
	<div class="flex gap-4 items-start">
		<Sidebar />
		<main class="flex-1 p-4">
			<PageTransition pathname={data.pathname}>
				<slot />
			</PageTransition>
		</main>
	</div>
</div>
