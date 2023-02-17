<script lang="ts">
	import type { HtmlSlot } from 'wc-js-utils/main';
	import { htmlSlotsContents, type HtmlSlotsContent } from '../stores/events';
	import { pageName } from '../stores/app';
	export let slots: HtmlSlot[];
	export let example_id: string;
	function updateSlot(name: string, val: string) {
		if (val && val.length) {
			const newContent: HtmlSlotsContent = {
				component: $pageName,
				content: val,
				name: name,
				example_id
			};
			if (!$htmlSlotsContents.length) {
				htmlSlotsContents.set([newContent]);
				console.log('newContent', newContent);
			} else if (
				!$htmlSlotsContents.find(
					(f) => f.component === $pageName && f.name === name && f.example_id === example_id
				)
			) {
				const previous = $htmlSlotsContents;

				previous.push(newContent);
				htmlSlotsContents.set(previous);
			} else if (
				$htmlSlotsContents.find(
					(f) => f.component === $pageName && f.name === name && f.example_id === example_id
				)
			) {
				const previous = $htmlSlotsContents;
				previous.find(
					(f) => f.component === $pageName && f.name === name && f.example_id === example_id
				).content = val;

				htmlSlotsContents.set(previous);
			}
		} else if (
			$htmlSlotsContents.find(
				(f) => f.component === $pageName && f.name === name && f.example_id === example_id
			)
		) {
			const previous = $htmlSlotsContents;
			const toRemove = previous.findIndex(
				(f) => f.component === $pageName && f.name === name && f.example_id === example_id
			);
			previous.splice(toRemove, 1);
			htmlSlotsContents.set(previous);
		}
	}
</script>

<table style="width:100%">
	<tr>
		<th>Slot Name</th>
		<th>Slot Content</th>
		<th>Slot Description</th>
	</tr>

	{#each slots as s (s.name)}
		<tr>
			<td>{s.name}</td>
			<td>
				<hb-input-area
					schemaentry={JSON.stringify({
						id: $pageName + '_' + s.name,
						value:
							$htmlSlotsContents.find(
								(f) => f.component === $pageName && f.name === s.name && f.example_id === example_id
							)?.content || ''
					})}
					on:setValue={(e) => {
						console.log('up slot', e.detail.value);
						updateSlot(s.name, e.detail.value);
					}}
				/>
			</td>
			<td>{s.description || ''}</td>
		</tr>
	{/each}
</table>
