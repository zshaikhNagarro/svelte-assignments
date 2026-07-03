import type { Meta, StoryObj } from '@storybook/svelte';
import Quiz from './+page.svelte';

const meta: Meta<Quiz> = {
	title: 'Components/Quiz',
	component: Quiz
};

export default meta;

export const Default: StoryObj<Quiz> = {};
