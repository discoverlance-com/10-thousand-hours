<script lang="ts">
	import { fly } from 'svelte/transition';

	export let pathname: string;
	console.log({ pathname });
</script>

{#key pathname}
	<div in:fly={{ y: -10, duration: 400, delay: 400 }} out:fly={{ y: 5, duration: 400 }}>
		<slot />
	</div>
{/key}
