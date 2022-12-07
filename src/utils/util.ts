import type { INavLink } from '@htmlbricks/hb-sidenav-link/release/webcomponent.type';
import type { allComponentsList } from 'src/stores/app';

export function getBootstrapCategoryIcon(categoryName: string) {
	switch (categoryName) {
		case 'basic':
			return 'puzzle';

		case 'dashboard':
			return 'speedometer';

		case 'site':
			return 'globe';
		case 'utils':
			return 'tools';
		case 'dev':
			return 'code';

		case 'layout':
			return 'grid-1x2';

		case 'form':
			return 'input-cursor-text';

		case 'payment':
			return 'credit-card';
		case 'docs':
			return 'file-earmark-text';

		case 'editor':
			return 'pencil-square';

		case 'input':
			return 'input-cursor-text';

		case 'graph':
			return 'graph-up';

		case 'archives':
			return 'archive';

		case 'components':
			return 'motherboard';

		case 'page':
			return 'window-fullscreen';

		case 'table':
			return 'table';
	}
}
async function fetchComponentsList(version: string) {
	try {
		const pageraw = await fetch(
			`https://cdn.jsdelivr.net/npm/@htmlbricks/hb-bundle@${version}/release/list.json`
		);
		const meta = await pageraw.json();
		return meta;
	} catch (err) {
		console.warn(`failed to fetch list`, err);
	}
}
export async function getNavlinks(cVersion: string, cList?: allComponentsList) {
	const home: INavLink = {
		key: 'main',
		label: 'home',
		group: '',
		active: false,
		icon: 'house-door'
	};

	const storybook: INavLink = {
		key: 'storybook',
		label: 'storybook',
		group: '',
		active: false,
		icon: 'grid-3x3-gap'
	};
	const github: INavLink = {
		key: 'github',
		label: 'github',
		group: '',
		active: false,
		icon: 'github'
	};
	const documentation: INavLink = {
		key: 'documentation',
		label: 'documentation',
		group: 'Docs',
		active: false,
		icon: 'book',
		subLinks: [
			{
				key: 'quick',
				label: 'Quick Start',
				group: 'Docs',
				active: false,
				icon: 'lightning'
			},
			{
				key: 'comparison',
				label: 'Comparison',
				group: 'Docs',
				active: false,
				icon: 'symmetry-vertical'
			},
			{
				key: 'readme',
				label: 'Readme',
				group: 'Docs',
				active: false,
				icon: 'book-half'
			}
		]
	};
	const settings: INavLink = {
		key: 'settings',
		label: 'settings',
		group: 'settings',
		active: false,
		icon: 'gear',
		subLinks: [
			{
				key: 'theme',
				label: 'Theme',
				group: 'theme',
				active: false,
				icon: 'palette'
			}
		]
	};
	const navLinks: INavLink[] = [home, documentation, storybook, github];
	const cats: string[] = [];
	if (!cList) {
		cList = await fetchComponentsList(cVersion);
	}

	if (cList?.packages)
		cList.packages.forEach((f) => {
			if (!cats.includes(f.category)) cats.push(f.category);
		});

	cats.forEach((f) => {
		const subLinks: INavLink[] = cList.packages
			.filter((fi) => fi.category === f)
			.map((m) => {
				const navLink: INavLink = {
					key: m.name,
					label: m.name.replace('hb-', ''),
					active: false
				};
				return navLink;
			});

		const navLink: INavLink = {
			key: f,
			label: f,
			group: 'Components',
			subLinks,
			active: false,
			icon: getBootstrapCategoryIcon(f)
		};
		navLinks.push(navLink);
	});
	navLinks.push(settings);

	return { navLinks, cList };
}
