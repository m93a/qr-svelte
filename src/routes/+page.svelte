<script lang="ts">
	import Scanner from '$lib/Scanner.svelte';
	let scanning = false;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Scanner {scanning} on:detected={(e) => console.log(e.detail.data)} on:error={(e) => console.error(e.detail)} />

<button on:click={() => (scanning = !scanning)}>
	{#if !scanning}
		Start scanning!
	{:else}
		Stop scanning!
	{/if}
</button>
