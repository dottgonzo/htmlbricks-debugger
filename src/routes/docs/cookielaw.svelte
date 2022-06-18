<script lang="ts">
	import { pageName, pageTitle } from '../../stores/app';
	pageName.set('cookielaw');
	pageTitle.set('cookie law');
</script>

<div class="container">
	<hb-terms-doc-templates
		id="com-hb-terms-doc-templates"
		data={JSON.stringify({
			id: 'cookie-doc-english',
			site: {
				name: 'demo.freewebcomponents.com',
				url: 'https://demo.freewebcomponents.com',
				privacyPolicyUri: 'https://demo.freewebcomponents.com/privacy_policy',
				cookiePolicyUri: 'https://demo.freewebcomponents.com/cookie_law'
			},
			company: { name: 'FWC Inc.', address: 'Acacia Avenue, 666' },
			date: '2020-01-01T00:00:00.000Z',
			cookies: [
				{
					name: 'testcookie1',
					purpose: 'test purpose',
					durate: 3600,
					service: 'test service',
					storage: 'persistent',
					type: 'technical'
				},
				{
					name: 'testcookie2',
					purpose: 'test purpose',
					durate: 3600,
					service: 'test service',
					storage: 'persistent',
					type: 'analytics'
				},
				{
					name: 'testcookie3',
					purpose: 'test purpose',
					durate: 3600,
					service: 'test service',
					storage: 'persistent',
					type: 'advertising'
				},
				{
					name: 'testcookie4',
					purpose: 'test purpose',
					durate: 3600,
					service: 'test service',
					storage: 'persistent',
					type: 'third-party'
				},
				{
					name: 'testcookie5',
					purpose: 'test purpose',
					durate: 3600,
					service: 'test service',
					storage: 'persistent',
					type: 'authentication'
				},
				{
					name: 'testcookie6',
					purpose: 'test purpose2',
					durate: 6600,
					service: 'test service2',
					storage: 'persistent',
					type: 'third-party'
				},
				{
					name: 'testcookie8',
					purpose: 'test purpose2',
					durate: 17600,
					service: 'test service2',
					storage: 'persistent',
					type: 'authentication'
				},
				{
					name: 'testcookie7',
					purpose: 'test purpose2',
					durate: 7600,
					service: 'test service2',
					storage: 'persistent',
					type: 'authentication'
				}
			]
		})}
	/>
</div>
