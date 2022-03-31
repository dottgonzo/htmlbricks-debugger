<script lang="ts">
	import { onMount } from 'svelte';
	import MarkdownIt from 'markdown-it';
	import { pageName, debugVersion } from '../stores/app';

	// export let definition: any;
	// export let storybookargs: any;
	// export let args: any;
	let loading = true;
	let content: string;
	export let repo_name: string;
	async function fetchInfo() {
		loading = true;
		try {
			const pageraw = await fetch(
				`https://cdn.jsdelivr.net/npm/${repo_name}@${$debugVersion}/README.md`
			);
			const txt = await pageraw.text();
			const md = new MarkdownIt();
			content = md.render(txt);
			loading = false;
		} catch (err) {
			console.warn(`no readme page for ${$pageName}`);
		}
	}
	$: {
		if ($pageName.length > 1 && $debugVersion.length > 1) fetchInfo().catch(console.error);
	}
	// onMount(() => {
	// });
</script>

{#if !loading}
	{@html content}
{:else}
	loading
{/if}
