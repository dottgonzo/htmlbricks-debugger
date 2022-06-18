<script lang="ts">
	import { pageName, pageTitle } from '../../stores/app';
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
				name: 'demo.freewebcomponents.com',
				url: 'https://demo.freewebcomponents.com',
				privacyPolicyUri: 'https://demo.freewebcomponents.com/privacy_policy',
				cookiePolicyUri: 'https://demo.freewebcomponents.com/cookie_law'
			},
			company: { name: 'INGECO S.R.L.', address: 'Piazza Cavour 33, Catania' },
			privacyAdmin: { name: 'testownerprivacy', email: 'ownprivacy.own' },
			date: '2020-01-01T00:00:00.000Z'
		})}
	/>
</div>
