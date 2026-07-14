<script>
	let { hero, business } = $props();
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
	<div class="hero-glow" aria-hidden="true"></div>
	<div class="container hero-inner">
		<div class="hero-copy" class:mounted>
			<span class="section-kicker stagger-1">{business.name}</span>
			<h1 class="stagger-2">{hero.headline}</h1>
			<p class="sub stagger-3">{hero.subheadline}</p>
			<div class="hero-actions stagger-4">
				<a class="btn btn-primary" href="tel:{business.phone}">Call {business.phoneDisplay}</a>
				<a class="btn btn-outline" href={waLink} target="_blank" rel="noopener">WhatsApp Us</a>
			</div>
		</div>
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
		padding: 64px 0 88px;
		overflow: hidden;
	}

	.hero-glow {
		position: absolute;
		inset: -20% -10% auto -10%;
		height: 480px;
		background: radial-gradient(
			circle at 30% 30%,
			color-mix(in srgb, var(--color-accent) 35%, transparent),
			transparent 60%
		);
		filter: blur(40px);
		opacity: 0.5;
		pointer-events: none;
		z-index: 0;
	}

	.hero-inner {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 48px;
		align-items: center;
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

	h1 {
		font-size: clamp(2.2rem, 5vw, 3.4rem);
	}

	.sub {
		color: var(--color-muted);
		font-size: 1.12rem;
		max-width: 46ch;
		margin: 0 0 2rem;
	}

	.hero-actions {
		display: flex;
		gap: 14px;
		flex-wrap: wrap;
	}

	.hero-media img {
		width: 100%;
		object-fit: contain;
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius);
		box-shadow: 0 30px 60px -30px rgba(var(--shadow-color), 0.5);
	}

	@media (max-width: 780px) {
		.hero-inner {
			grid-template-columns: 1fr;
		}
		.hero-media {
			order: -1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-copy > *,
		.hero-media {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>