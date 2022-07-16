<script lang="ts">
	import { addComponent, LanguageTranslator } from '@htmlbricks/hb-jsutils';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { siteUrl, oauth2providers, componentsVersion, authUrl } from '../stores/app';
	onMount(() => {
		addComponent({ repoName: '@htmlbricks/hb-layout', version: $componentsVersion });
		addComponent({ repoName: '@htmlbricks/hb-auth', version: $componentsVersion });
	});
	async function authorizeSocialLogin(detail: {
		token: string;
		provider: string;
		redirect_uri: string;
	}) {
		const url = $authUrl + '/social/login';
		const response = await fetch(url, {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(Object.assign({ redirect_uri: detail.redirect_uri }, detail))
		});
		console.log('server answer with', response);
		if (response.ok) {
			const data = await response.json();

			localStorage.setItem('_hbtoken', data.token);
		} else {
			try {
				const data = await response.json();
				throw new Error(JSON.stringify(data));
			} catch (err) {
				throw err;
			}
		}
	}
	async function socialLoginOauthAnswer(detail: {
		token?: string;
		provider: string;
		tmpCode?: string;
		redirect_uri?: string;
	}) {
		console.log('auth socialLoginOauthAnswer', detail);
		try {
			if (!detail?.provider) {
				return console.error('auth socialLoginOauthAnswer: no provider');
			}
			const payload = {
				provider: detail.provider,
				token: detail.token || detail.tmpCode,
				redirect_uri: detail.redirect_uri || 'https://demo.freewebcomponents.com/login'
			};
			if (!payload.token) {
				return console.error('auth socialLoginOauthAnswer: no token');
			}

			await authorizeSocialLogin(payload);
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
	<div slot="page" id="page">
		<hb-auth
			oauth2providers={JSON.stringify($oauth2providers)}
			type="login"
			logouri="/logoonly.png"
			disablelocal="yes"
			on:oauthFlowInit={(e) => socialLoginOauthAnswer(e.detail).catch((c) => console.error(c))}
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

	#page {
		position: absolute;
		height: 100%;
		top: 0px;
		width: 100%;
		display: flex;
		justify-content: center;
	}
	hb-auth {
		margin: 0;
		position: absolute;
		top: 45%;
		display: block;
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
	}
</style>
