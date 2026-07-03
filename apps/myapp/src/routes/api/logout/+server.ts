import { json, redirect } from '@sveltejs/kit';
import { clearSession } from '$lib/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = ({ cookies }) => {
	clearSession(cookies);
	return json({ success: true });
};
