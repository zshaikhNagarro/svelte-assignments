module.exports = {
	stories: ['../src/**/*.stories.@(js|ts|mdx)'],
	addons: ['@storybook/addon-essentials'],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	typescript: {
		check: false,
		safe: true
	}
};
