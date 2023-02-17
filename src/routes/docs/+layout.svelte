<script lang="ts">
	import { goto } from '$app/navigation';
	import type { INavLink } from '@htmlbricks/hb-sidenav-link/release/webcomponent.type';
	import { addComponent, LanguageTranslator } from 'wc-js-utils';
	import { onMount } from 'svelte';
	import {
		pageName,
		componentsVersion,
		lang,
		componentsList,
		siteUrl,
		pageTitle
	} from '../../stores/app';
	import { events } from '../../stores/events';
	import { getNavlinks } from '../../utils/util';
	import { loop_guard } from 'svelte/internal';

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
		on:navbarSlotClick={(e) => {
			goto('/');
		}}
		noburger="yes"
		pagename={$pageName}
		page_title={$pageTitle}
		companytitle="fff"
		companylogouri=""
		cookielaw=""
		policies={JSON.stringify([
			{
				label: 'Privacy Policy',
				key: 'privacypolicy',
				link: `${$siteUrl}/docs/privacy`
			},
			{
				label: 'Cookie Law',
				key: 'cookielaw',
				link: `${$siteUrl}/docs/cookielaw`
			}
		])}
		company={JSON.stringify({
			logoUri: '/monochromelogoonly_512.png',
			siteName: 'freewebcomponents.com',
			companyName: 'INGECO S.R.L.',
			registration: '2022 dev',
			description: `freewebcomponents.com - Free Web Components - HTML Bricks`,
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
