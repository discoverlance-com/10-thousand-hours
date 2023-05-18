<script>
	// Skeleton theme:
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import Header from '$components/Header.svelte';
	import Sidebar from '$components/Sidebar.svelte';
</script>

<div class="app max-w-7xl mx-auto relative">
	<Header />
	<div class="flex gap-4 items-start">
		<Sidebar />
		<main class="flex-1 pt-5 px-4">
			<slot />
		</main>
	</div>
</div>
