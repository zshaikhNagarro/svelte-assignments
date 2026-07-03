<script lang="ts">
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import welcome from '$lib/images/svelte-welcome.webp';

	import Counter from './Counter.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcomeFallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<a class="quiz-button" href="/quiz" sveltekit:prefetch>Start quiz</a>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}

	.quiz-button {
		display: inline-block;
		margin: 1rem 0;
		padding: 0.75rem 1.25rem;
		background: #ff3e00;
		color: white;
		text-decoration: none;
		border-radius: 0.75rem;
		font-weight: bold;
		transition: transform 0.2s ease, background 0.2s ease;
	}

	.quiz-button:hover {
		transform: translateY(-2px);
		background: #ff5e22;
	}
</style>
