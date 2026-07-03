import type { Meta, StoryObj } from '@storybook/svelte';
import Counter from './Counter.svelte';

const meta: Meta<Counter> = {
	title: 'Components/Counter',
	component: Counter
};

export default meta;

export const Default: StoryObj<Counter> = {};
