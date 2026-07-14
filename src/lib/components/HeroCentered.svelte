<script>
	let { hero, business, stats } = $props();
	let mounted = $state(false);

	$effect(() => {
		const t = setTimeout(() => (mounted = true), 40);
		return () => clearTimeout(t);
	});

	let waLink = $derived(
		`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
			`Hi, I found ${business.name} online and wanted to ask about your services.`
		)}`
	);
</script>

<section class="hero" id="top">
	<div class="container">
		<div class="hero-copy" class:mounted>
			<span class="section-kicker stagger-1">{business.name}</span>
			<h1 class="stagger-2">{hero.headline}</h1>
			<p class="sub stagger-3">{hero.subheadline}</p>
			<div class="hero-actions stagger-4">
				<a class="btn btn-primary" href="tel:{business.phone}">Call {business.phoneDisplay}</a>
				<a class="btn btn-outline" href={waLink} target="_blank" rel="noopener">WhatsApp Us</a>
			</div>
		</div>

		{#if stats?.length}
			<div class="trust-strip stagger-5" class:mounted>
				{#each stats as stat}
					<div class="trust-item">
						<span class="trust-value">{stat.value}</span>
						<span class="trust-label">{stat.label}</span>
					</div>
				{/each}
			</div>
		{/if}

		{#if hero.image}
			<div class="hero-media" class:mounted>
				<img src={hero.image} alt={business.name} />
			</div>
		{/if}
	</div>
</section>

<style>
	.hero {
		position: relative;
		padding: 64px 0 40px;
	}

	.hero-copy {
		text-align: center;
		max-width: 760px;
		margin: 0 auto;
	}

	.hero-copy > * {
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 0.6s ease,
			transform 0.6s ease;
	}

	.hero-copy.mounted .stagger-1 {
		transition-delay: 0.02s;
	}
	.hero-copy.mounted .stagger-2 {
		transition-delay: 0.12s;
	}
	.hero-copy.mounted .stagger-3 {
		transition-delay: 0.22s;
	}
	.hero-copy.mounted .stagger-4 {
		transition-delay: 0.32s;
	}
	.hero-copy.mounted > * {
		opacity: 1;
		transform: translateY(0);
	}

	h1 {
		font-size: clamp(2.1rem, 4.8vw, 3.1rem);
	}

	.sub {
		color: var(--color-muted);
		font-size: 1.1rem;
		max-width: 52ch;
		margin: 0 auto 2rem;
	}

	.hero-actions {
		display: flex;
		gap: 14px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.trust-strip {
		display: flex;
		justify-content: center;
		gap: 0;
		flex-wrap: wrap;
		margin: 48px 0;
		border-top: var(--border-width) solid var(--color-border);
		border-bottom: var(--border-width) solid var(--color-border);
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 0.6s ease 0.42s,
			transform 0.6s ease 0.42s;
	}

	.trust-strip.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.trust-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 32px;
		border-right: var(--border-width) solid var(--color-border);
	}

	.trust-item:last-child {
		border-right: none;
	}

	.trust-value {
		font-family: var(--font-display);
		font-weight: var(--heading-weight);
		font-size: 1.6rem;
		color: var(--color-primary);
	}

	.trust-label {
		font-size: 0.82rem;
		color: var(--color-muted);
	}

	.hero-media {
		opacity: 0;
		transform: translateY(20px) scale(0.98);
		transition:
			opacity 0.7s ease 0.15s,
			transform 0.7s ease 0.15s;
	}

	.hero-media.mounted {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	.hero-media img {
		width: 100%;
		aspect-ratio: 21 / 9;
		object-fit: cover;
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius);
	}

	@media (max-width: 780px) {
		.trust-strip {
			flex-direction: column;
			align-items: center;
		}
		.trust-item {
			border-right: none;
			border-bottom: var(--border-width) solid var(--color-border);
			width: 100%;
		}
		.trust-item:last-child {
			border-bottom: none;
		}
		.hero-media img {
			aspect-ratio: 4 / 3;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-copy > *,
		.hero-media,
		.trust-strip {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>