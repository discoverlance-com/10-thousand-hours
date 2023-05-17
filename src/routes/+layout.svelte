<script>
	// Skeleton theme:
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import Header from '$components/Header.svelte';
	import Sidebar from '$components/Sidebar.svelte';
</script>

<div class="app max-w-7xl mx-auto">
	<Header />
	<div class="flex gap-4">
		<Sidebar />
		<main class="flex-1 pt-5 px-4">
			<slot />
		</main>
	</div>
</div>
