// @ts-nocheck
import { getSession } from '$lib/auth';
import type { LayoutServerLoad } from './$types';

export const load = ({ cookies }: Parameters<LayoutServerLoad>[0]) => {
	const session = getSession(cookies);

	return {
		session: session || { isLoggedIn: false, username: '' }
	};
};
