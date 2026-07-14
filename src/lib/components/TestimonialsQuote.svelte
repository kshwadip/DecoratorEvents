<script lang="ts">
	import { reveal } from '$lib/actions/reveal.js';

	let { testimonials } = $props();
	let index = $state(0);
	let active = $derived(testimonials[index]);

	function go(i: number) {
		index = (i + testimonials.length) % testimonials.length;
	}

	$effect(() => {
		const timer = setInterval(() => go(index + 1), 6000);
		return () => clearInterval(timer);
	});
</script>

<section class="section" id="testimonials">
	<div class="container">
		<span class="section-kicker reveal" use:reveal>Reviews</span>
		<h2 class="section-title reveal" use:reveal={{ delay: 60 }}>What Patients & Clients Say</h2>

		<div class="quote-panel reveal" use:reveal={{ delay: 100 }}>
			<div class="quote-mark" aria-hidden="true">&ldquo;</div>
			<p class="quote-text">{active.text}</p>
			<div class="quote-mark" aria-hidden="true">&rdquo;</div>
			<p class="author">~ {active.name}</p>
			<div class="stars" aria-label="{active.rating} out of 5 stars">
				{'★'.repeat(active.rating)}{'☆'.repeat(5 - active.rating)}
			</div>

			<div class="dots">
				{#each testimonials as _, i}
					<button
						class="dot"
						class:active={i === index}
						onclick={() => go(i)}
						aria-label="Show review {i + 1}"
					></button>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.quote-panel {
		max-width: 720px;
		margin: 0 auto;
		text-align: center;
		background: var(--color-surface);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius);
		padding: 56px 40px;
	}

	.quote-mark {
		font-family: var(--font-display);
		font-size: 4rem;
		line-height: 1;
		color: var(--color-primary);
		opacity: 0.35;
		margin-bottom: -1rem;
	}

	.quote-text {
		font-size: 1.25rem;
		line-height: 1.5;
	}

	.stars {
		color: var(--color-accent);
		letter-spacing: 3px;
		margin: 8px 0 8px;
	}

	.author {
		font-weight: 700;
		color: var(--color-muted);
		margin: 0 0 0;
	}

	.dots {
		display: flex;
		justify-content: center;
		gap: 8px;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: none;
		background: var(--color-border);
		cursor: pointer;
		padding: 0;
		transition: background-color 0.2s ease, transform 0.2s ease;
	}

	.dot.active {
		background: var(--color-primary);
		transform: scale(1.3);
	}
</style>