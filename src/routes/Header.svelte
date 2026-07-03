<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import github from '$lib/images/github.svg';
	import logo from '$lib/images/svelte-logo.svg';

	interface Props {
		session?: {
			isLoggedIn: boolean;
			username?: string;
		};
	}

	let { session }: Props = $props();

	// Use a state rune so the header updates reactively on the client
	let sessionState = $state(session || { isLoggedIn: false, username: '' });

	let logoutLoading = $state(false);

	// listen for client-side session updates (dispatched after login)
	onMount(() => {
		const handler = (ev: CustomEvent) => {
			if (ev && ev.detail) sessionState = ev.detail;
		};
		window.addEventListener('session:update', handler as EventListener);
		return () => window.removeEventListener('session:update', handler as EventListener);
	});

	async function handleLogout() {
		logoutLoading = true;
		try {
			await fetch('/api/logout', { method: 'POST' });
			// update client-side state immediately
			sessionState = { isLoggedIn: false, username: '' };
			// notify other components
			window.dispatchEvent(new CustomEvent('session:update', { detail: sessionState }));
			window.location.href = '/';
		} catch (error) {
			console.error('Logout failed:', error);
			logoutLoading = false;
		}
	}
</script>

<header>
	<div class="corner">
		<a href="https://svelte.dev/docs/kit">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={page.url.pathname === '/' ? 'page' : undefined}>
				<a href={resolve('/')}>Home</a>
			</li>
			<li aria-current={page.url.pathname === '/quiz' ? 'page' : undefined}>
				<a href={resolve('/quiz')}>Quiz</a>
			</li>
			<li aria-current={page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
				<a href={resolve('/sverdle')}>Sverdle</a>
			</li>
			{#if !sessionState.isLoggedIn}
				<li>
					<a href={resolve('/login')}>Login</a>
				</li>
			{/if}
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner auth-corner">
		    {#if sessionState.isLoggedIn}
			    <span class="username">{sessionState.username}</span>
			<button class="logout-btn" onclick={handleLogout} disabled={logoutLoading}>
				{logoutLoading ? 'Logging out...' : 'Logout'}
			</button>
		{:else}
			<a href="https://github.com/sveltejs/kit">
				<img src={github} alt="GitHub" />
			</a>
		{/if}
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.auth-info {
		display: flex;
		align-items: center;
		padding: 0 0.75rem;
	}

	.username {
		color: var(--color-theme-1);
		font-weight: 600;
		font-size: 0.85rem;
		text-transform: capitalize;
	}

	.logout-btn {
		background: none;
		border: none;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		cursor: pointer;
		padding: 0 0.5rem;
		height: 100%;
		transition: color 0.2s linear;
		font-family: inherit;
	}

	.auth-corner {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.5rem;
		min-width: 10rem;
		height: 3em;
		padding-right: 0.5rem;
	}

	.auth-corner .username {
		color: var(--color-theme-1);
		font-weight: 600;
		font-size: 0.85rem;
	}

	.logout-btn:hover:not(:disabled) {
		color: var(--color-theme-1);
	}

	.logout-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
