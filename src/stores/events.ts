import { writable, type Writable } from 'svelte/store';

export type HtmlSlotsContent = {
	component: string;
	example_id: string;
	name: string;
	content: string;
};
export type CssPartsContent = {
	component: string;
	example_id: string;
	name: string;
	content: string;
};
export type CssVarsValue = { component: string; example_id: string; name: string; value: string };
export type GlobalCssVarsValue = { name: string; value: string };

export type ComponentEvent = {
	component: string;
	name: string;
	data: JSON;
	unixtime: number;
	_id: string;
	seq: number;
	example_id: string;
};

export const events: Writable<ComponentEvent[]> = writable([]);

export const htmlSlotsContents: Writable<HtmlSlotsContent[]> = writable([]);
export const cssVarsValues: Writable<CssVarsValue[]> = writable([]);
export const globalCssVarsValues: Writable<GlobalCssVarsValue[]> = writable([]);
export const cssPartsContents: Writable<CssPartsContent[]> = writable([]);
