import { readable, writable, type Readable, type Writable } from 'svelte/store';

export const token: Writable<string> = writable('');

export const authCookieName: Writable<string> = writable('_hbtoken');

export const tokenUri: Readable<string> = readable('https://fn.freewebcomponents.com/.netlify/functions/auth/token');