<script>
	let { testimonials } = $props();
</script>

<section class="section" id="testimonials">
	<div class="container">
		<span class="section-kicker">Reviews</span>
		<h2 class="section-title">What Customers Say</h2>

		<div class="grid grid-3">
			{#each testimonials as t}
				<div class="card testimonial">
					<div class="stars" aria-label="{t.rating} out of 5 stars">
						{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
					</div>
					<p class="quote">{t.text}</p>
					<p class="author">— {t.name}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.testimonial {
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
		color: var(--color-text);
	}

	.author {
		font-weight: 600;
		margin: 12px 0 0;
		font-size: 0.9rem;
		color: var(--color-muted);
	}
</style>
