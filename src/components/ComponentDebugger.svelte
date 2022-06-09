<script lang="ts">
	import AllSchemeTable from './AllSchemesTable.svelte';
	import ControlTable from './ControlTable.svelte';
	import PropsTable from './PropsTable.svelte';
	import SlotTable from './SlotTable.svelte';
	import InfoTable from './InfoTable.svelte';
	import InstallTable from './InstallTable.svelte';
	import I18nTable from './LangTable.svelte';
	import CssPartsTable from './CssPartsTable.svelte';
	import CssVarsTable from './CssVarsTable.svelte';
	import EventsTable from './EventsTable.svelte';
	import { componentsVersion, debugVersion, lang } from '../stores/app';
	import { events, htmlSlotsContents, cssVarsValues, cssPartsContents } from '../stores/events';
	import compareVersions from 'compare-versions';
	import type { ComponentSetup } from '@htmlbricks/hb-jsutils';

	// import { getAbbreviatedPackument } from 'query-registry';

	let controlTab: 'props' | 'schemes' | 'events' | 'style' | 'slots' | 'install' | 'i18n' | 'info';

	let com: string;
	let cdnUri: string;
	let args: string;

	let allCssVars: { name: string; value: string }[];
	let meta: ComponentSetup;

	let lastLoadId = 'none';

	export let repo_name: string;

	async function loadMeta(repoName: string, version: string) {
		meta = null;
		try {
			const pageraw = await fetch(
				`https://cdn.jsdelivr.net/npm/${repoName}@${version}/release/manifest.json`
			);
			meta = await pageraw.json();
			console.log('meta ok');
		} catch (err) {
			console.warn(`failed to fetch manifest for ${repoName}`);
		}
	}
	let componentVersions: { repoName: string; versions: string[] };
	async function getComponentVersions(repoName: string) {
		try {
			const pageraw = await fetch(`https://registry.npmjs.cf/${repoName}`);
			const jsonfetched = await pageraw.json();

			const availableVersions = Object.keys(jsonfetched.versions)
				.filter(
					(f) =>
						compareVersions.validate(f) &&
						(!repoName.includes('@htmlbricks') || compareVersions.compare(f, '0.12.3', '>='))
				)
				.sort((a, b) => (compareVersions.compare(a, b, '<') ? 1 : -1));

			componentVersions = {
				repoName: repoName,
				versions: availableVersions
			};
		} catch (err) {
			console.warn(`failed to fetch npm versions for ${repoName}`);
		}
	}

	let iframeUri: string;
	let example_id: string;

	function metaLoaded() {}

	$: {
		if (!componentVersions || componentVersions.repoName !== repo_name) {
			getComponentVersions(repo_name).catch(console.error);
		}

		const tmpLoadId = repo_name + '_' + $debugVersion;
		if (repo_name && (!meta || tmpLoadId !== lastLoadId) && $debugVersion) {
			controlTab = 'info';

			meta = null;
			loadMeta(repo_name, $debugVersion).catch(console.error);
			lastLoadId = tmpLoadId;
		}

		// i18nLangs = meta?.i18n;
		if (meta) {
			if (meta.examples.length) {
				if (!example_id || !args) example_id = meta.examples?.[0]?.name;

				args = meta.examples?.find((f) => f.name === example_id)?.data;
			}

			console.log(args, 'args', meta);
			com = '';
			if (
				$cssPartsContents.filter((f) => f.component === meta.name && f.example_id === example_id)
					?.length
			) {
				com += '<sty' + 'le>';
				for (const p of $cssPartsContents.filter(
					(f) => f.component === meta.name && f.example_id === example_id
				)) {
					com += `${meta.name}::part(${p.name}){${p.content}}`;
				}
				com += '</sty' + 'le>';
			}

			com += `<${meta.name} id="com-${meta.name}"`;
			// if (lang && !args?.['i18nlang'] && meta?.i18n?.length) {
			// 	com += ` i18nlang="${lang}"`;
			// }
			if (args) {
				for (const k of Object.keys(args)) {
					switch (typeof args[k]) {
						case 'number':
						case 'string':
							if (args[k]) com += ` ${k}="${args[k]}"`;
							break;
						case 'boolean':
							com += ` ${k}="${args[k] ? 'yes' : 'no'}"`;
							break;
						case 'object':
							com += ` ${k}='${JSON.stringify(args[k])}'`;
							break;
					}
				}
			}
			if (
				meta.styleSetup?.vars &&
				meta.styleSetup.vars.filter((f) => typeof f.defaultValue !== 'undefined').length
			) {
				com += ` style="`;
				for (const css of meta.styleSetup.vars.filter(
					(f) => typeof f.defaultValue !== 'undefined'
				)) {
					com += `${css.name}:${css.defaultValue};`;
				}
				com += `"`;
			}
			com += ` >`;
			if (
				$htmlSlotsContents.filter((f) => f.component === meta.name && f.example_id === example_id)
					?.length
			) {
				for (const sl of $htmlSlotsContents.filter(
					(f) => f.component === meta.name && f.example_id === example_id
				)) {
					com += `<div slot="${sl.name}">${sl.content}</div>`;
				}
			}

			com += `</${meta.name}>`;

			com += ` />`;
			cdnUri = `<${'script'} id="${
				meta.name
			}-script" src="https://cdn.jsdelivr.net/npm/@htmlbricks/${
				meta.name
			}@${$debugVersion}/release/release.js"></${'script'}>`;

			allCssVars = $cssVarsValues
				.filter((f) => f.component === meta.name && f.example_id === example_id)
				?.map((m) => {
					return { name: m.name, value: m.value };
				});
			// if (meta.styleSetup.themes.includes('bootstrap')) {
			// 	const toAdd = $globalCssVarsValues.filter(
			// 		(f) => !allCssVars.find((ff) => ff.name === f.name)
			// 	);

			// 	allCssVars.concat(toAdd);
			// }
			iframeUri = `/playgrounds/sandbox?slots=${
				$htmlSlotsContents.filter((f) => f.component === meta.name && f.example_id === example_id)
					?.length
					? encodeURIComponent(
							JSON.stringify(
								$htmlSlotsContents.filter(
									(f) => f.component === meta.name && f.example_id === example_id
								)
							)
					  )
					: ''
			}&repo_name=${meta.repoName.split('/')[0]}&css=${
				allCssVars.length ? encodeURIComponent(JSON.stringify(allCssVars)) : ''
			}&component=${meta.name}&params=${encodeURIComponent(
				JSON.stringify(args)
			)}&parts=${encodeURIComponent(
				JSON.stringify(
					$cssPartsContents.filter((f) => f.component === meta.name && f.example_id === example_id)
				)
			)}&version=${$debugVersion}&id=${example_id}`;
		}
	}
	function setVersion(e: { detail: { value: string } }) {
		if (e?.detail?.value) {
			const ver = e.detail.value;
			if (compareVersions.validate(ver)) {
				if (ver !== $debugVersion) {
					if (ver === $componentsVersion && location.href.includes('version')) {
						location.href =
							location.href.split('&version=')[0] +
							(location.href.split('&version=')[1].split('&')?.[1] || '');
					} else if (location.href.includes('version')) {
						location.href =
							location.href.split('&version=')[0] +
							'&version=' +
							ver +
							(location.href.split('&version=')[1].split('&')?.[1] || '');
					} else {
						location.href = location.href + '&version=' + ver;
					}
				}
			}
		}
	}
	function openIframeOnnewWindow() {
		const popup = window.open(iframeUri);
		if (popup == null) alert('Please change your popup settings');
		else {
			popup.moveTo(0, 0);
			popup.resizeTo(screen.width, screen.height);
		}
	}
</script>

<div class="container-fluid">
	{#if meta && args}
		<div style="margin-top:40px; padding:0px" class="row">
			<div class="col-7">
				<div>
					<div style="width:100%;text-align:center">
						<h3 style="display: flex;flex-flow: wrap;width: 420px;  margin: auto;">
							<span style="margin:auto 0.8em auto 0.8em">
								{#if componentVersions?.versions?.length && Array.isArray(componentVersions.versions)}
									<hb-input-select
										style="width:150px;display:inline-block;"
										schemaentry={JSON.stringify({
											id: 'selectversion',
											params: {
												options: componentVersions?.versions.map((m) => {
													return {
														value: m,
														label: m + (m === $componentsVersion ? ' (current)' : '')
													};
												})
											},
											value: $debugVersion
										})}
										on:setValue={setVersion}
									/>
								{:else}
									{$debugVersion}
								{/if}
							</span>
							<span>
								<hb-input-select
									style="width:150px;display:inline-block;"
									schemaentry={JSON.stringify({
										id: 'selectversion',
										params: {
											options: meta.examples?.map((m) => {
												return {
													value: m.name,
													label: m.name
												};
											})
										},
										value: example_id
									})}
									on:setValue={(v) => {
										console.log('setvalu', v, v.detail);
										example_id = v.detail.value;
									}}
								/>
							</span>
							<button
								class="btn btn-outline-dark btn-sm"
								on:click={() => {
									openIframeOnnewWindow();
								}}><i class="bi bi-arrow-up-right-square" /></button
							>
						</h3>
					</div>
					<div style="border:1px solid yellow;margin-top:20px">
						<iframe style="width:100%;height:450px" title="component" src={iframeUri} />
					</div>
				</div>
			</div>
			<div style="padding:0px" class="col-5">
				<ul class="nav nav-tabs">
					<li class="nav-item">
						<button
							class="nav-link {controlTab === 'info' ? 'active' : ''}"
							on:click={() => {
								controlTab = 'info';
							}}>info</button
						>
					</li>
					<li class="nav-item">
						<button
							class="nav-link {controlTab === 'install' ? 'active' : ''}"
							on:click={() => {
								controlTab = 'install';
							}}>install</button
						>
					</li>
					<li class="nav-item">
						<button
							class="nav-link {controlTab === 'props' ? 'active' : ''}"
							on:click={() => {
								controlTab = 'props';
							}}>props</button
						>
					</li>
					<li class="nav-item">
						<button
							class="nav-link {controlTab === 'schemes' ? 'active' : ''}"
							on:click={() => {
								controlTab = 'schemes';
							}}>schemes</button
						>
					</li>

					<li class="nav-item">
						<button
							on:click={() => {
								controlTab = 'style';
							}}
							class="nav-link {meta.styleSetup?.vars?.length || meta.styleSetup?.parts?.length
								? ''
								: 'disabled'} {controlTab === 'style' ? 'active' : ''}">style</button
						>
					</li>
					<li class="nav-item">
						<button
							on:click={() => {
								controlTab = 'slots';
							}}
							class="nav-link {meta.htmlSlots?.length ? '' : 'disabled'} {controlTab === 'slots'
								? 'active'
								: ''}"
							>slots <span
								style={$htmlSlotsContents?.filter(
									(f) => f.component === meta.name && f.example_id === example_id
								).length
									? 'color:red;'
									: ''}
								class="badge bg-secondary"
								>{$htmlSlotsContents?.filter(
									(f) => f.component === meta.name && f.example_id === example_id
								).length || 0}/{meta.htmlSlots?.length || 0}</span
							></button
						>
					</li>
					<li class="nav-item">
						<button
							on:click={() => {
								controlTab = 'i18n';
							}}
							class="nav-link {meta?.i18n?.length ? '' : 'disabled'} {controlTab === 'i18n'
								? 'active'
								: ''}"
							>i18n

							<span
								style={$lang && meta?.i18n?.length ? 'color:black;' : ''}
								class="badge bg-secondary">{$lang ? $lang : ''} | {meta?.i18n?.length || 0}</span
							>
						</button>
					</li>
					<li class="nav-item">
						<button
							on:click={() => {
								controlTab = 'events';
							}}
							class="nav-link position-relative {meta?.definitions?.events?.definitions?.Events
								?.properties &&
							Object.keys(meta.definitions.events.definitions.Events.properties)?.length
								? ''
								: 'disabled'} {controlTab === 'events' ? 'active' : ''}"
							>events
							{#if $events?.filter((f) => f.component === meta.name && f.example_id === example_id)?.length && meta?.definitions?.events?.definitions?.Events?.properties && Object.keys(meta.definitions.events.definitions.Events.properties)?.length}
								<span
									class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
								>
									{#if !$events?.filter((f) => f.component === meta.name && f.example_id === example_id)?.length}
										0
									{:else if $events?.filter((f) => f.component === meta.name && f.example_id === example_id)?.length < 100}
										{$events
											?.filter((f) => f.component === meta.name && f.example_id === example_id)
											?.length?.toString()}
									{:else}
										99+
									{/if}

									<span class="visually-hidden">unread messages</span>
								</span>
							{/if}
						</button>
					</li>
				</ul>
				<div
					style="border-left: 1px solid #dee2e6;height:500px;padding:0px 20px 0px 20px;overflow-y: auto;"
				>
					<div style="padding-top:20px">
						{#if controlTab === 'props' && meta?.definitions?.component}
							<ControlTable
								definition={meta.definitions.component}
								storybookargs={meta.storybookArgs}
								bind:args
							/>
						{:else if controlTab === 'info'}
							<InfoTable repo_name={meta?.repoName} />
						{:else if controlTab === 'install'}
							<InstallTable {com} cdn={cdnUri} />
						{:else if controlTab === 'schemes'}
							<PropsTable
								definition={meta.definitions.component}
								storybookargs={meta.storybookArgs}
							/>
							<AllSchemeTable definition={meta.definitions.component} />
						{:else if controlTab === 'events'}
							<EventsTable definition={meta.definitions.events} {example_id} />
						{:else if controlTab === 'i18n'}
							<I18nTable {meta} bind:args />
						{:else if controlTab === 'slots'}
							<SlotTable slots={meta.htmlSlots} {example_id} />
						{:else if controlTab === 'style'}
							{#if meta.styleSetup?.parts?.length}
								<div>
									<CssPartsTable parts={meta.styleSetup.parts} {example_id} />
								</div>
							{/if}
							{#if meta.styleSetup?.vars?.length}
								<div>
									<CssVarsTable vars={meta.styleSetup.vars} {example_id} />
								</div>
							{/if}
						{/if}
					</div>
				</div>
				<!-- {@html com} -->
			</div>
		</div>
	{:else}
		loading debugger
	{/if}
</div>

<style lang="scss">
</style>
