import type { Meta, StoryObj } from '@storybook/svelte';
import Header from './Header.svelte';

const meta: Meta<Header> = {
	title: 'Components/Header',
	component: Header
};

export default meta;

export const Default: StoryObj<Header> = {};
