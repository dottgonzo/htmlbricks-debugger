<script lang="ts">
	import type { CssVar } from 'wc-js-utils/main';
	import { defaultBootstrapThemeCssVars } from '../stores/themes';
	import { pageName } from '../stores/app';
	import { cssVarsValues } from '../stores/events';

	export let vars: CssVar[];
	export let example_id: string;

	function setCssVar(detail, name: string) {
		let copy = $cssVarsValues;
		// exclude templates vars just embedded by deault template
		const existentChange = copy?.find(
			(f) => f.component === $pageName && f.name === name && f.example_id === example_id
		);
		if (detail.value) {
			if (existentChange && existentChange.value !== detail.value) {
				existentChange.value = detail.value;
				cssVarsValues.set(copy);
			} else if (!existentChange) {
				copy.push({ name, component: $pageName, value: detail.value, example_id });
				cssVarsValues.set(copy);
			}
		} else if (!detail.value && existentChange) {
			const changeIndex = copy.findIndex(
				(f) => f.component === $pageName && f.name === name && f.example_id === example_id
			);
			copy.splice(changeIndex, 1);
			cssVarsValues.set(copy);
		}
	}
</script>

{#if vars.filter((f) => !f?.theme)?.length}
	<div>variables</div>
	<table style="width:100%">
		<tr>
			<th>Name</th>
			<th>Value</th>
			<th>Description</th>
		</tr>

		{#each vars.filter((f) => !f?.theme) as v (v.name)}
			<tr>
				<td>{v.name}</td>
				<td>
					{#if v.valueType === 'color'}
						<hb-input-color
							schemaentry={JSON.stringify({
								value: v.defaultValue?.toString() || '',
								label: v.name,
								id: `css_${$pageName}_${v.name}`
							})}
							on:setValue={(e) => {
								setCssVar(e.detail, v.name);
							}}
						/>
					{:else if v.valueType === 'string'}
						<hb-input-text
							schemaentry={JSON.stringify({
								value: v.defaultValue?.toString() || '',
								label: v.name,
								id: `css_${$pageName}_${v.name}`
							})}
							on:setValue={(e) => {
								setCssVar(e.detail, v.name);
							}}
						/>
					{/if}
				</td>
				<td>{v.description || ''}</td>
			</tr>
		{/each}
	</table>
{/if}
{#if vars.filter((f) => f?.theme)?.length}
	<div>bootstrap theme vars</div>

	<table style="width:100%">
		<tr>
			<th>Name</th>
			<th>Value</th>
		</tr>

		{#each $defaultBootstrapThemeCssVars
			.filter((f) => vars.filter((ff) => ff.theme === 'bootstrap').find((ff) => ff.name === f.name))
			.sort((a, b) => (b.rank || 1) - (a.rank || 1)) as bv (bv.name)}
			<tr>
				<td>{bv.name}</td>
				<td>
					{#if bv.type === 'color'}
						<hb-input-color
							schemaentry={JSON.stringify({
								value: bv.value?.toString() || '',
								label: bv.name,
								id: `css_${$pageName}_${bv.name}`
							})}
							on:setValue={(e) => {
								setCssVar(e.detail, bv.name);
							}}
						/>
					{:else if bv.type === 'string'}
						<hb-input-text
							schemaentry={JSON.stringify({
								value: bv.value?.toString() || '',
								label: bv.name,
								id: `css_${$pageName}_${bv.name}`
							})}
							on:setValue={(e) => {
								setCssVar(e.detail, bv.name);
							}}
						/>
					{/if}
				</td>
			</tr>
		{/each}
	</table>
{/if}
