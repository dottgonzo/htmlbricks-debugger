<script lang="ts">
	import type { CssPart } from '@htmlbricks/hb-jsutils/main';
	import { cssPartsContents, type CssPartsContent } from '../stores/events';
	import { pageName } from '../stores/app';

	export let parts: CssPart[];

	export let example_id: string;

	function setPartVal(detail, name: string) {
		const val = detail?.value;
		console.log('setPart', val, name);
		const partsContents = $cssPartsContents;
		const partsContensExists = $cssPartsContents.find(
			(f) => f.component === $pageName && f.name === name && f.example_id === example_id
		);
		if (val) {
			if (partsContensExists && partsContensExists.content !== val) {
				partsContensExists.content = val;
				cssPartsContents.set(partsContents);
			} else if (!partsContensExists) {
				partsContents.push({ name, component: $pageName, content: val, example_id });
				cssPartsContents.set(partsContents);
			}
		} else if (partsContensExists && !val) {
			const partsContensExistsIndex = $cssPartsContents.findIndex(
				(f) => f.component === $pageName && f.name === name && f.example_id === example_id
			);
			partsContents.splice(partsContensExistsIndex, 1);
			cssPartsContents.set(partsContents);
		}
	}
</script>

<table style="width:100%">
	<tr>
		<th>Css Part Name</th>
		<th>Css Part Content</th>
		<th>Css Part Description</th>
	</tr>

	{#each parts as part (part.name)}
		<tr>
			<td>{part.name}</td>
			<td
				><hb-input-area
					schemaentry={JSON.stringify({
						id: 'inputareapart' + part.name,
						value: $cssPartsContents.find(
							(f) =>
								f.component === $pageName && f.name === part.name && f.example_id === example_id
						)
							? $cssPartsContents.find(
									(f) =>
										f.component === $pageName && f.name === part.name && f.example_id === example_id
							  )
							: ''
					})}
					on:setValue={(e) => setPartVal(e.detail, part.name)}
				/></td
			>
			<td>{part.description || ''}</td>
		</tr>
	{/each}
</table>
