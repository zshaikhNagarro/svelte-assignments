import type { Cookies } from '@sveltejs/kit';

export interface Session {
	username: string;
	userId: string;
	isLoggedIn: boolean;
}

const SESSION_COOKIE_NAME = 'session';

export function createSession(username: string, userId: string): Session {
	return {
		username,
		userId,
		isLoggedIn: true
	};
}

export function setSessionCookie(cookies: Cookies, username: string, userId: string): void {
	cookies.set(SESSION_COOKIE_NAME, JSON.stringify(createSession(username, userId)), {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7 // 7 days
	});
}

export function getSession(cookies: Cookies): Session | null {
	const sessionCookie = cookies.get(SESSION_COOKIE_NAME);
	if (!sessionCookie) {
		return null;
	}
	try {
		return JSON.parse(sessionCookie);
	} catch {
		return null;
	}
}

export function clearSession(cookies: Cookies): void {
	cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
}
