<script lang="ts">
	import { addComponent, LanguageTranslator } from '@htmlbricks/hb-jsutils';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { siteUrl, oauth2providers, componentsVersion, authUrl } from '../stores/app';
	onMount(() => {
		addComponent({ repoName: '@htmlbricks/hb-layout', version: $componentsVersion });
		addComponent({ repoName: '@htmlbricks/hb-auth', version: $componentsVersion });
	});
	async function authorizeSocialLogin(detail: { token: string; provider: string }) {
		const url = $authUrl + '/social/login';
		const response = await fetch(url, {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(detail)
		});
		console.log('server answer with', response);
		if (response.ok) {
			const data = await response.json();
			console.log('server json answer', data);
		} else {
			try {
				const data = await response.json();
				throw new Error(JSON.stringify(data));
			} catch (err) {
				throw err;
			}
		}
	}
	async function socialLoginOauthAnswer(detail: { token: string; provider: string }) {
		console.log('auth socialLoginOauthAnswer', detail);
		try {
			if (!detail.token) {
				return console.error('auth socialLoginOauthAnswer: no token');
			}
			await authorizeSocialLogin(detail);
		} catch (err) {
			console.error('auth socialLoginOauthAnswer:', err);
		}
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"
	/>
</svelte:head>
<hb-layout
	on:navbarSlotClick={(e) => {
		goto('/');
	}}
	pagename="Access"
	page_title="Access"
	onescreen="yes"
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
>
	<div slot="page" style="position: absolute;height: 100%;top: 0px;width: 100%;">
		<hb-auth
			oauth2providers={JSON.stringify($oauth2providers)}
			type="login"
			logouri="/banner_one_all.png"
			disablelocal="yes"
			on:getProviderToken={(e) => socialLoginOauthAnswer(e.detail).catch((c) => console.error(c))}
		/>
	</div>
</hb-layout>

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
