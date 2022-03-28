<script lang="ts">
	import ComponentDebugger from '../../components/ComponentDebugger.svelte';
	import { page } from '$app/stores';
	import { debugVersion, componentsVersion, pageName } from '../../stores/app';

	let repo_name;
	$: {
		const name = $page.url?.href?.split('c=')?.[1]?.split('&')[0];

		repo_name = $page.url?.href?.split('repo_name=')?.[1]?.split('&')[0];
		if (!repo_name && name) {
			repo_name = '@htmlbricks/' + name;
		}
		pageName.set(name || repo_name?.split('/')?.[1] || repo_name || 'doc');

		const version = $page.url?.href?.split('version=')?.[1]?.split('&')[0] || $componentsVersion;
		debugVersion.set(version);
	}
</script>

{#if repo_name}
	<ComponentDebugger {repo_name} />
{/if}
