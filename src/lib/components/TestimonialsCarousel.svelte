<script>
	import { reveal } from "$lib/actions/reveal.js";

	let { testimonials } = $props();
</script>

<section class="section" id="testimonials">
	<div class="container">
		<div class="head-row reveal" use:reveal>
			<h2 class="section-title">Reviews</h2>
			<div class="carousel">
				{#each testimonials as t, i}
					<div
						class="card t-card reveal"
						use:reveal={{ delay: i * 90 }}
					>
						<div
							class="stars"
							aria-label="{t.rating} out of 5 stars"
						>
							{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
						</div>
						<p class="quote">{t.text}</p>
						<p class="author">— {t.name}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.head-row {
		margin-bottom: 8px;
	}

	.carousel {
		display: flex;
		gap: 20px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		padding-top: 10px;
		-webkit-overflow-scrolling: touch;
	}

	.carousel::-webkit-scrollbar {
		height: 6px;
	}

	.carousel::-webkit-scrollbar-thumb {
		background: var(--color-border);
		border-radius: 4px;
	}

	.t-card {
		flex: 0 0 320px;
		scroll-snap-align: start;
		display: flex;
		flex-direction: column;
	}

	.stars {
		color: var(--color-accent);
		letter-spacing: 2px;
		margin-bottom: 12px;
	}

	.quote {
		flex: 1;
		font-size: 0.98rem;
	}

	.author {
		font-weight: 700;
		margin: 12px 0 0;
		font-size: 0.9rem;
		color: var(--color-muted);
	}

	@media (max-width: 600px) {
		.t-card {
			flex-basis: 82vw;
		}
	}
</style>
