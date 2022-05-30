<script lang="ts">
	import ComponentDebugger from '../../components/ComponentDebugger.svelte';
	import { pageName, componentsList, debugVersion } from '../../stores/app';
	import { page } from '$app/stores';
	import type { ComponentSetup } from '@htmlbricks/hb-jsutils';
	let shortMeta: Partial<ComponentSetup>;
	let name;
	$: {
		name = $page.url?.href?.split('c=')?.[1]?.split('&')[0];

		pageName.set(name || 'doc');
		if ($componentsList) {
			shortMeta = $componentsList.packages.find((f) => f.name === name);
			if ($page.url?.href?.split?.('version=')?.[1]?.split?.('&')?.[0]?.length) {
				debugVersion.set($page.url.href.split('version=')[1].split('&')[0]);
			} else {
				debugVersion.set(shortMeta.version);
			}
		}
	}
</script>

{#if shortMeta && name}
	<ComponentDebugger repo_name={shortMeta.repoName} />
{/if}
