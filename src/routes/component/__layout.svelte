<script lang="ts">
	import { goto } from '$app/navigation';
	import type { INavLink } from '@htmlbricks/hb-sidenav-link/release/webcomponent.type';
	import { addComponent, LanguageTranslator } from '@htmlbricks/hb-jsutils';
	import { onMount } from 'svelte';
	import { pageName, componentsVersion, lang, componentsList } from '../../stores/app';
	import { events } from '../../stores/events';

	// import {
	// 	globalBootstrapThemeCssVars,
	// 	bootstrapThemeCssVars,
	// 	defaultootstrapThemeCssVars
	// } from '../../stores/themes';
	// if (!$globalBootstrapThemeCssVars?.length) {
	// 	globalBootstrapThemeCssVars.set($defaultootstrapThemeCssVars);
	// }
	// if (!$bootstrapThemeCssVars?.length) {
	// 	bootstrapThemeCssVars.set($defaultootstrapThemeCssVars);
	// }

	onMount(() => {
		addComponent({ repoName: '@htmlbricks/hb-bundle', version: $componentsVersion });
		events.set(JSON.parse(window.localStorage.getItem('componentsEvents') || '[]'));

		if (!$lang) lang.set(LanguageTranslator.getDefaultLang());

		window.onstorage = () => {
			// When local storage changes, dump the list to
			// the console.
			console.log('change');
			events.set(JSON.parse(window.localStorage.getItem('componentsEvents')));
		};
	});
</script>

<svelte:head>
	<!-- <link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
		crossorigin="anonymous"
	/> -->
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"
	/>
</svelte:head>
<slot />

<style lang="scss" global>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
	@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css');
	$primary: #07689f;
	$secondary: #c9d6df;
	$success: #11d3bc;
	$danger: #f67280;
	$info: #a2d5f2;
	$warning: #ff7e67;
	$light: #fafafa;
	$dark: #4e4e4e;
	@import 'bootstrap/scss/bootstrap';

	body {
		font-family: 'Roboto', sans-serif;
	}
</style>
