<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { countUp } from '$lib/actions/countUp.js';

	let { about } = $props();
</script>

<section class="section" id="about">
	<div class="container">
		<span class="section-kicker reveal" use:reveal>About Us</span>
		<h2 class="section-title reveal" use:reveal={{ delay: 60 }}>{about.heading}</h2>
		<p class="section-lede reveal" use:reveal={{ delay: 100 }}>{about.text}</p>

		{#if about.stats?.length}
			<div class="stats">
				{#each about.stats as stat, i}
					<div class="stat reveal" use:reveal={{ delay: 140 + i * 90 }}>
						<div class="stat-value" use:countUp>{stat.value}</div>
						<div class="stat-label">{stat.label}</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.stats {
		display: flex;
		gap: 40px;
		flex-wrap: wrap;
		margin-top: 1rem;
	}

	.stat-value {
		font-family: var(--font-display);
		font-weight: var(--heading-weight);
		font-size: 2.1rem;
		color: var(--color-primary);
		font-variant-numeric: tabular-nums;
	}

	.stat-label {
		color: var(--color-muted);
		font-size: 0.9rem;
	}
</style>