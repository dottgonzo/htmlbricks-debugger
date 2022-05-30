import { readable, writable, type Readable, type Writable } from 'svelte/store';
import type { ComponentShortSetup } from '@htmlbricks/hb-jsutils';

export type allComponentsList = {
	packages: ComponentShortSetup[];
	version: string;
};

export const pageName: Writable<string> = writable('');
export const componentsVersion: Readable<string> = readable('0.11.5');
export const debugVersion: Writable<string> = writable(null);
// export const defaultRootRepo: Readable<string> = readable('@htmlbricks');
// export const rootRepo: Writable<string> = writable(null);

export const homePage: Readable<string> = readable('/components/comparison');

export const lang: Writable<string> = writable('');

export const componentsList: Writable<allComponentsList> = writable(null);
