<script lang="ts">
	import { pageName, pageTitle } from '../../../stores/app';
	pageName.set('privacypolicy');
	pageTitle.set('privacy policy');
</script>

<div class="container">
	<hb-terms-doc-templates
		id="com-hb-terms-doc-templates"
		data={JSON.stringify({
			collectedData: { dataTypes: [], scopes: [] },
			id: 'privacy-doc-italian',
			site: {
				name: 'docs.htmlbricks.borgo.studio',
				url: 'https://docs.htmlbricks.borgo.studio',
				privacyPolicyUri: 'https://docs.htmlbricks.borgo.studio/privacy_policy',
				cookiePolicyUri: 'https://docs.htmlbricks.borgo.studio/cookie_law'
			},
			company: { name: 'INGECO S.R.L.', address: 'Piazza Cavour 33, Catania' },
			privacyAdmin: { name: 'testownerprivacy', email: 'ownprivacy.own' },
			date: '2020-01-01T00:00:00.000Z'
		})}
	/>
</div>
