import { redirect } from '@sveltejs/kit';
import { getSession } from '$lib/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	const session = getSession(cookies);

	if (!session || !session.isLoggedIn) {
		redirect(302, '/login');
	}

	return {
		username: session.username
	};
};
