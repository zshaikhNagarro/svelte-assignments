<script lang="ts">
	type Question = {
		question: string;
		choices: string[];
		answer: number;
		explanation: string;
	};

	const questions: Question[] = [
		{
			question: 'What is the capital of France?',
			choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
			answer: 2,
			explanation: 'Paris is the capital and largest city of France.'
		},
		{
			question: 'Which planet is known as the Red Planet?',
			choices: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
			answer: 1,
			explanation: 'Mars is called the Red Planet because of its reddish appearance.'
		},
		{
			question: 'What is the chemical symbol for water?',
			choices: ['H2O', 'CO2', 'O2', 'NaCl'],
			answer: 0,
			explanation: 'Water is made of two hydrogen atoms and one oxygen atom: H2O.'
		},
		{
			question: 'Which language is used to style web pages?',
			choices: ['HTML', 'Python', 'CSS', 'Java'],
			answer: 2,
			explanation: 'CSS is used to style HTML documents in web pages.'
		},
		{
			question: 'Which animal is known as the king of the jungle?',
			choices: ['Elephant', 'Lion', 'Tiger', 'Bear'],
			answer: 1,
			explanation: 'The lion is traditionally known as the king of the jungle.'
		}
	];

	let currentIndex = $state(0);
	let selectedChoice = $state<number | null>(null);
	let score = $state(0);
	let feedback = $state<'correct' | 'incorrect' | null>(null);
	let completed = $state(false);

	let currentQuestion = $derived(() => questions[currentIndex]);
	let canSubmit = $derived(() => selectedChoice !== null && feedback === null);
	let nextButtonLabel = $derived(() =>
		currentIndex + 1 === questions.length ? 'See results' : 'Next question'
	);

	function chooseQuestion(index: number) {
		if (completed || feedback) return;
		selectedChoice = index;
	}

	function submitAnswer() {
		if (selectedChoice === null || feedback) return;

		feedback = selectedChoice === currentQuestion().answer ? 'correct' : 'incorrect';
		if (feedback === 'correct') {
			score += 1;
		}
	}

	function nextQuestion() {
		if (currentIndex + 1 >= questions.length) {
			completed = true;
			return;
		}

		currentIndex += 1;
		selectedChoice = null;
		feedback = null;
	}

	function restartQuiz() {
		currentIndex = 0;
		selectedChoice = null;
		score = 0;
		feedback = null;
		completed = false;
	}
</script>

<svelte:head>
	<title>Quiz</title>
	<meta name="description" content="A quick multiple-choice quiz game" />
</svelte:head>

<section class="quiz-page">
	<header class="intro">
		<h1>Quiz Game</h1>
		<p>Answer five questions to test your knowledge. Select an option, submit, and see your score at the end.</p>
	</header>

	{#if completed}
		<div class="results">
			<p class="summary">You scored {score} out of {questions.length}.</p>
			<button onclick={restartQuiz}>Play again</button>
		</div>
	{:else}
		<div class="card">
			<div class="meta">Question {currentIndex + 1} of {questions.length}</div>
			<p class="question">{currentQuestion().question}</p>

			<div class="choices">
				{#each currentQuestion().choices as choice, index}
					<button
						type="button"
						class="choice"
						class:selected={selectedChoice === index}
						onclick={() => chooseQuestion(index)}
					>
						{choice}
					</button>
				{/each}
			</div>

			<div class="actions">
				<button class="submit-btn" type="button" onclick={submitAnswer} disabled={!canSubmit()}>Submit answer</button>
				{#if feedback}
					<div class="feedback {feedback}">
						{#if feedback === 'correct'}
							Correct! {currentQuestion().explanation}
						{:else}
							Incorrect. {currentQuestion().explanation}
						{/if}
					</div>
					<button class="next-btn" type="button" onclick={nextQuestion}>
						{nextButtonLabel()}
					</button>
				{/if}
			</div>
		</div>
	{/if}
</section>

<style>
	.quiz-page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.submit-btn, .next-btn {
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

	.choice {
		display: inline-block;
		padding: 0.75rem 1.25rem;
		background: #ff3e00;
		color: white;
		text-decoration: none;
		border-radius: 0.75rem;
		font-weight: bold;
		transition: transform 0.2s ease, background 0.2s ease;
		&.selected {
			background: rgb(226, 222, 220);
			color: #333;
		}
	}
	.intro {
		max-width: 42rem;
	}

	.card,
	.results {
		padding: 1.5rem;
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
	}

	.meta {
		font-size: 0.9rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-theme-1);
		margin-bottom: 0.75rem;
	}

	.question {
		font-size: 1.3rem;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.choices {
		display: grid;
		gap: 0.75rem;
	}
</style>