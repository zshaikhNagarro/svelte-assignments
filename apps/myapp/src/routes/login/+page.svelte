<script lang="ts">
	import { goto } from '$app/navigation';

	let username = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleLogin(e) {
		if (e && e instanceof SubmitEvent) {
			e.preventDefault();
		}

		if (!username.trim() || !password.trim()) {
			error = 'Please enter both username and password';
			return;
		}

		loading = true;
		error = '';

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username: username.trim(), password: password.trim() })
			});

			if (response.ok) {
				const data = await response.json();
				// notify client UI that session is now active
				window.dispatchEvent(new CustomEvent('session:update', { detail: { isLoggedIn: true, username: data.username } }));
				await goto('/quiz');
			} else {
				const data = await response.json();
				error = data.error || 'Login failed. Please try again.';
			}
		} catch (err) {
			error = 'An error occurred. Please try again.';
		} finally {
			loading = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !loading) {
			handleLogin();
		}
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to access the quiz" />
</svelte:head>

<div class="login-container">
	<div class="login-card">
		<h1>Login</h1>
		<p class="subtitle">Enter your credentials to access the quiz</p>

		<form onsubmit={handleLogin}>
			<div class="form-group">
				<label for="username">Username</label>
				<input
					type="text"
					id="username"
					bind:value={username}
					onkeydown={handleKeydown}
					disabled={loading}
					placeholder="Enter your username"
				/>
				</div>

				<div class="form-group">
					<label for="password">Password</label>
					<input
						type="password"
						id="password"
						bind:value={password}
						onkeydown={handleKeydown}
						disabled={loading}
						placeholder="Enter your password"
					/>
				</div>

			{#if error}
				<div class="error-message">{error}</div>
			{/if}

			<button type="submit" disabled={loading || !username.trim() || !password.trim()}>
				{loading ? 'Logging in...' : 'Login'}
			</button>

			<p class="demo-info">Demo credentials: username: <strong>demo</strong> | password: <strong>123456</strong></p>
		</form>
	</div>
</div>

<style>
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 200px);
		padding: 2rem 1rem;
	}

	.login-card {
		width: 100%;
		max-width: 400px;
		padding: 2rem;
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
	}

	h1 {
		margin: 0 0 0.5rem 0;
		font-size: 1.8rem;
		font-weight: 700;
	}

	.subtitle {
		margin: 0 0 1.5rem 0;
		color: var(--color-text, #666);
		font-size: 0.95rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		font-size: 0.95rem;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--color-border, #ddd);
		border-radius: 0.5rem;
		font-size: 1rem;
		font-family: inherit;
		box-sizing: border-box;
		transition: border-color 0.2s ease;
	}

	input:focus {
		outline: none;
		border-color: var(--color-theme-1, #ff3e00);
	}

	input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.error-message {
		padding: 0.75rem;
		margin-bottom: 1rem;
		background: #fee;
		border: 1px solid #fcc;
		border-radius: 0.5rem;
		color: #c33;
		font-size: 0.9rem;
	}

	button {
		width: 100%;
		padding: 0.75rem;
		background: var(--color-theme-1, #ff3e00);
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: opacity 0.2s ease;
	}

	button:hover:not(:disabled) {
		opacity: 0.9;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.demo-info {
		margin: 1.5rem 0 0 0;
		padding-top: 1rem;
		border-top: 1px solid var(--color-border, #ddd);
		font-size: 0.85rem;
		color: var(--color-text, #666);
		text-align: center;
	}

	.demo-info strong {
		font-weight: 600;
		color: var(--color-theme-1, #ff3e00);
	}
</style>
