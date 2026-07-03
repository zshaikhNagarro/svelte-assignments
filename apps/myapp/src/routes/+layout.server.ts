import { getSession } from '$lib/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	const session = getSession(cookies);

	return {
		session: session || { isLoggedIn: false, username: '' }
	};
};
