import { readable, writable, type Readable, type Writable } from 'svelte/store';
import type { ComponentShortSetup } from '@htmlbricks/hb-jsutils';

export type allComponentsList = {
	packages: ComponentShortSetup[];
	version: string;
};
const googleClientId = '737686426982-4b7qenmb8jl7rf1j4jp649gai7t3jh00.apps.googleusercontent.com'
const googleScope = 'https%3A//www.googleapis.com/auth/userinfo.email'
const productionFontendUrl = 'https://demo.freewebcomponents.com'
const developmentFontendUrl = 'http://localhost:3000'
export const authUrl: Readable<string> = readable('https://fn.freewebcomponents.com/.netlify/functions/auth')

export const oauth2providers: Readable<{ provider: string, uri: string }[]> = readable([
	{
		provider: 'google',
		uri: `https://accounts.google.com/o/oauth2/v2/auth?scope=${googleScope}&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${productionFontendUrl}/login&client_id=${googleClientId}`
	},
	{
		provider: 'facebook',
		uri: ''
	},
	{
		provider: 'twitter',
		uri: ''
	}
])
export const pageName: Writable<string> = writable('');
export const pageTitle: Writable<string> = writable('');
export const componentsVersion: Readable<string> = readable('0.15.13');
export const debugVersion: Writable<string> = writable(null);
// export const defaultRootRepo: Readable<string> = readable('@htmlbricks');
// export const rootRepo: Writable<string> = writable(null);

export const homePage: Readable<string> = readable('/components/comparison');
export const siteUrl: Readable<string> = readable('https://demo.freewebcomponents.com');

export const lang: Writable<string> = writable('');

export const componentsList: Writable<allComponentsList> = writable(null);
