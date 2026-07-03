import { json } from '@sveltejs/kit';
import { setSessionCookie } from '$lib/auth';
import type { RequestHandler } from './$types';

// Dummy user database
const users = [
	{ id: '1', username: 'demo', password: '123456' },
	{ id: '2', username: 'user', password: 'password' },
	{ id: '3', username: 'test', password: 'test123' }
];

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { username, password } = await request.json();

		// Validate input
		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			return json({ error: 'Invalid username or password' }, { status: 400 });
		}

		const trimmedUsername = username.trim();
		const trimmedPassword = password.trim();

		if (trimmedUsername.length === 0 || trimmedPassword.length === 0) {
			return json({ error: 'Username and password are required' }, { status: 400 });
		}

		// Find user in dummy database
		const user = users.find(
			(u) => u.username === trimmedUsername && u.password === trimmedPassword
		);

		if (!user) {
			return json({ error: 'Invalid username or password' }, { status: 401 });
		}

		// Set session cookie with user info
		setSessionCookie(cookies, user.username, user.id);

		return json({ success: true, username: user.username, userId: user.id });
	} catch (error) {
		return json({ error: 'Failed to process login' }, { status: 400 });
	}
};
