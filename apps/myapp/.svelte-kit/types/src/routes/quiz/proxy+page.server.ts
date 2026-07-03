// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { getSession } from '$lib/auth';
import type { PageServerLoad } from './$types';

export const load = ({ cookies }: Parameters<PageServerLoad>[0]) => {
	const session = getSession(cookies);

	if (!session?.isLoggedIn) {
		throw redirect(303, '/login');
	}

	return {};
};