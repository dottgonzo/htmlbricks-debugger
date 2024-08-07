import { readable, writable, type Readable, type Writable } from 'svelte/store';
import type { ComponentShortSetup } from 'wc-js-utils';

export type allComponentsList = {
	packages: ComponentShortSetup[];
	version: string;
};

export const pageName: Writable<string> = writable('');
export const pageTitle: Writable<string> = writable('');
export const componentsVersion: Readable<string> = readable('0.20.14');
export const debugVersion: Writable<string> = writable(null);
// export const defaultRootRepo: Readable<string> = readable('@htmlbricks');
// export const rootRepo: Writable<string> = writable(null);

export const homePage: Readable<string> = readable('/components/comparison');
export const siteUrl: Readable<string> = readable('https://docs.htmlbricks.borgo.studio');

export const lang: Writable<string> = writable('');

export const componentsList: Writable<allComponentsList> = writable(null);
