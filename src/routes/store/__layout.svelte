<script lang="ts">
	import { goto } from '$app/navigation';
	import type { INavLink } from '@htmlbricks/hb-sidenav-link/release/webcomponent.type';
	import { addComponent, LanguageTranslator } from '@htmlbricks/hb-jsutils';
	import { onMount } from 'svelte';
	import { pageName, componentsVersion, lang, componentsList } from '../../stores/app';
	import { getNavlinks } from '../../utils/util';
	import { token, authCookieName, tokenUri } from '../../stores/user';

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
	let navlinks: INavLink[];
	$: {
		if (!navlinks && $componentsVersion)
			getNavlinks($componentsVersion, $componentsList)
				.then((opts) => {
					navlinks = opts.navLinks;
					componentsList.set(opts.cList);
				})
				.catch(console.error);
	}

	onMount(async () => {
		addComponent({ repoName: '@htmlbricks/hb-bundle', version: $componentsVersion });

		if (!$lang) lang.set(LanguageTranslator.getDefaultLang());

		if (!$token) {
			let tk: string;
			let storageType = 'localStorage';
			tk = localStorage.getItem($authCookieName);
			if (!tk) {
				tk = sessionStorage.getItem($authCookieName);
				storageType = 'sessionStorage';
			}

			if (tk) {
				const auth = await fetch($tokenUri, {
					headers: { Authorization: tk, 'Content-Type': 'application/json' },
					method: 'POST',
					body: JSON.stringify({ token: tk })
				});
				if (!auth.ok) {
					console.error('not logged');
					switch (storageType) {
						case 'localStorage':
							localStorage.removeItem($authCookieName);
							break;
						case 'sessionStorage':
							sessionStorage.removeItem($authCookieName);
							break;
					}
					goto(`/login`);
				} else if (auth.ok) {
					const decodedAuth = await auth.json();
					if (decodedAuth.error) {
						console.error('unauthorized');
						switch (storageType) {
							case 'localStorage':
								localStorage.removeItem($authCookieName);
								break;
							case 'sessionStorage':
								sessionStorage.removeItem($authCookieName);
								break;
						}
						goto(`/login`);
					} else {
						token.set(tk);
					}
				}
			} else {
				goto(`/login`);
			}
		}
	});
	function pageChange(d) {
		if (!d.page) return console.error('wrong page', d);
		switch (d.page) {
			case 'comparison':
			case 'readme':
			case 'theme':
			case 'quick':
				return goto('/components/' + d.page);
			case 'github':
				return window
					.open('https://github.com/dottgonzo/bootstrap-webcomponents-monorepo', '_blank')
					.focus();
			case 'storybook':
				return window.open('https://storybook.freewebcomponents.com', '_blank').focus();
			default:
				return goto('/components/component?c=' + d.page);
		}
	}
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
{#if navlinks}
	<hb-layout
		pagename={$pageName}
		page_title={$pageName}
		companytitle="fff"
		companylogouri=""
		cookielaw=""
		navlinks={JSON.stringify(navlinks)}
		company={JSON.stringify({
			logoUri: '/original.png',
			siteName: 'tttttt',
			companyName: 'INGECO S.R.L.',
			registration: 'copyright',
			description: `testo e descrizione di esempio dell applicazione`,
			vatNumber: 'aa - ffffff'
		})}
		sidebar={JSON.stringify({
			logo: '/monochromelogoonly_512.png',
			title: 'HtmlB',
			type: 'autohide'
		})}
		contacts={JSON.stringify({
			sites: [{ label: 'dariocaruso.info', uri: 'https://dariocaruso.info' }],
			phones: [{ number: '6666666666666' }],
			addresses: [],
			emails: []
		})}
		socials={JSON.stringify({
			github: { pageUri: 'https://github.com/dottgonzo/bootstrap-webcomponents-monorepo' }
		})}
		on:pageChange={(e) => pageChange(e.detail)}
	>
		<div slot="page">
			<slot />
		</div>
	</hb-layout>
{/if}

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
