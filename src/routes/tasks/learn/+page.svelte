<script>
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Create Task - 10 thousand hours</title>
	<meta name="description" content="Create a new task" />
</svelte:head>

<section in:fade={{ duration: 100, delay: 100 }}>
	<h1 class="text-4xl font-bold text-center gradient-heading">Start Learning</h1>
</section>
