<script>
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	export let data;
	const { service, business } = data;
</script>

<svelte:head><title>{service.title} — {business.name}</title></svelte:head>

<section class="section">
	<div class="container detail-grid">
		<div>
			<a class="back-link" href="/#services">← Back to services</a>
			<h1>{service.title}</h1>
			<p class="section-lede">{service.longDescription}</p>
			{#if service.list}
				<ul>
					{#each service.list as item}
						<li>{item}</li>
					{/each}
				</ul>
			{/if}
			<a class="btn btn-primary" href="tel:{business.phone}">Call {business.phoneDisplay}</a>
		</div>
		{#if service.images?.length}
			<ImageCarousel images={service.images} alt={service.title} />
		{/if}
	</div>
</section>

<style>
	.detail-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		align-items: start;
	}
	.back-link {
		display: inline-block;
		margin-bottom: 16px;
		font-size: 0.9rem;
		color: var(--color-muted);
		text-decoration: none;
	}
	@media (max-width: 780px) {
		.detail-grid { grid-template-columns: 1fr; }
	}
</style>