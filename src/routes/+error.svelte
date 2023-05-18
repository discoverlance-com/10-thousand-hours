<script>
	import { page } from '$app/stores';
</script>

<div>
	<h1 class="text-center text-3xl mb-8 font-bold">Oops! Erorr encountered</h1>
	<p class="text-center text-2xl gradient-heading">
		{$page.status} - <span>{$page.error?.message}</span>
	</p>
</div>
