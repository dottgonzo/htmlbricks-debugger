import { readable, writable, type Readable, type Writable } from 'svelte/store';
import type { ComponentShortSetup } from '@htmlbricks/hb-jsutils';

export type allComponentsList = {
	packages: ComponentShortSetup[];
	version: string;
};
const githubClientId = 'a355c8b84da0daf4b701'
const gitlabClientId = 'cf6a29d469aeca70ae50611f01ef0188343707270071ee7f6dc3e030a0009d17'
const gitlabScope = 'read_user'

const facebookClientId = '1011321802910911'
const facebookScope = 'email'


const twitterClientId = '7pmt9Ydh9ASiUWqjMa8mOCHz8'
const twitterScope = 'email'

const googleClientId = '737686426982-4b7qenmb8jl7rf1j4jp649gai7t3jh00.apps.googleusercontent.com'
const googleScope = 'https%3A//www.googleapis.com/auth/userinfo.email'
const githubScope = 'user'
const productionFontendUrl = 'https://demo.freewebcomponents.com'
const developmentFontendUrl = 'http://localhost:3000'
export const authUrl: Readable<string> = readable('https://fn.freewebcomponents.com/.netlify/functions/auth')

export const oauth2providers: Readable<{ provider: string, uri: string }[]> = readable([

	{
		provider: 'github',
		uri: `https://github.com/login/oauth/authorize?scope=${githubScope}&client_id=${githubClientId}&redirect_uri=${productionFontendUrl}/login?provider=github`
	},
	{
		provider: 'gitlab',
		uri: `https://gitlab.com/oauth/authorize?scope=${gitlabScope}&response_type=code&state=${new Date().valueOf()}&client_id=${gitlabClientId}&redirect_uri=${productionFontendUrl}/login?provider=gitlab`
	},

	// {
	// 	provider: 'twitter',
	// 	uri: `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${twitterClientId}&scope=${twitterScope}&state=state&code_challenge=challenge&code_challenge_method=plain&redirect_uri=${productionFontendUrl}/login?provider=twitter`
	// }
])
export const pageName: Writable<string> = writable('');
export const pageTitle: Writable<string> = writable('');
export const componentsVersion: Readable<string> = readable('0.15.22');
export const debugVersion: Writable<string> = writable(null);
// export const defaultRootRepo: Readable<string> = readable('@htmlbricks');
// export const rootRepo: Writable<string> = writable(null);

export const homePage: Readable<string> = readable('/components/comparison');
export const siteUrl: Readable<string> = readable('https://demo.freewebcomponents.com');

export const lang: Writable<string> = writable('');

export const componentsList: Writable<allComponentsList> = writable(null);
