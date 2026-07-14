<script>
	let { hero, business, ticker } = $props();
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

	// svelte-ignore state_referenced_locally
	const items = ticker?.length ? ticker : ['CALL NOW', 'WHATSAPP US', 'WALK-INS WELCOME'];
	// Duplicate so the marquee loops seamlessly
	const loopItems = [...items, ...items, ...items];
</script>

<section class="hero" id="top">
	<div
		class="hero-media"
		class:mounted
		style="background-image: url({hero.image})"
		role="img"
		aria-label={business.name}
	>
		<div class="hero-scrim" aria-hidden="true"></div>
		<div class="container hero-inner">
			<div class="hero-copy" class:mounted>
				<span class="section-kicker stagger-1">{business.name}</span>
				<h1 class="stagger-2">{hero.headline}</h1>
				<p class="sub stagger-3">{hero.subheadline}</p>
				<div class="hero-actions stagger-4">
					<a class="btn btn-accent" href="tel:{business.phone}">Call {business.phoneDisplay}</a>
					<a class="btn btn-outline hero-outline" href={waLink} target="_blank" rel="noopener"
						>WhatsApp Us</a
					>
				</div>
			</div>
		</div>
	</div>
	

	<div class="marquee" aria-hidden="true">
		<div class="marquee-track">
			{#each loopItems as item}
				<span class="marquee-item">{item}</span>
				<span class="marquee-dot">●</span>
			{/each}
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
	}

	.hero-media {
		position: relative;
		min-height: 560px;
		display: flex;
		align-items: center;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: right;
		background-color: var(--color-primary);
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	.hero-media.mounted {
		opacity: 1;
	}

	.hero-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			100deg,
			color-mix(in srgb, var(--color-bg) 92%, transparent) 0%,
			color-mix(in srgb, var(--color-bg) 55%, transparent) 45%,
			color-mix(in srgb, var(--color-bg) 20%, transparent) 100%
		);
	}

	.hero-inner {
		position: relative;
		z-index: 1;
		width: 100%;
	}

	.hero-copy {
		max-width: 640px;
		padding: 60px 0;
	}

	.hero-copy > * {
		opacity: 0;
		transform: translateY(20px);
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
		font-size: clamp(2.6rem, 6.5vw, 4.4rem);
		color: var(--color-text);
	}

	.sub {
		color: var(--color-text);
		opacity: 0.8;
		font-size: 1.1rem;
		max-width: 44ch;
		margin: 0 0 2rem;
	}

	.hero-actions {
		display: flex;
		gap: 14px;
		flex-wrap: wrap;
	}

	.hero-outline {
		border-color: var(--color-text);
	}

	.marquee {
		overflow: hidden;
		background: var(--color-text);
		color: var(--color-bg);
		padding: 14px 0;
		white-space: nowrap;
	}

	.marquee-track {
		display: inline-flex;
		align-items: center;
		gap: 20px;
		animation: scroll-left 22s linear infinite;
		width: max-content;
	}

	.marquee-item {
		font-family: var(--font-display);
		font-weight: var(--heading-weight);
		text-transform: var(--heading-transform);
		letter-spacing: 0.04em;
		font-size: 1rem;
	}

	.marquee-dot {
		color: var(--color-accent);
		font-size: 0.6rem;
	}

	@keyframes scroll-left {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-33.333%);
		}
	}

	@media (max-width: 780px) {
		.hero-media {
			min-height: 460px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-copy > *,
		.hero-media {
			opacity: 1;
			transform: none;
			transition: none;
		}
		.marquee-track {
			animation: none;
		}
	}
</style>