<script>
	let { services } = $props();
</script>

<section class="section" id="services">
	<div class="container">
		<span class="section-kicker">What We Do</span>
		<h2 class="section-title">Services</h2>
		<p class="section-lede">
			A quick look at what we offer — call or WhatsApp for anything not
			listed here.
		</p>

		<div class="grid grid-3">
			{#each services as service}
				<a
					style="text-decoration: none; color: inherit;"
					href="/services/{service.slug}/"
				>
					<div class="card">
					<img
						    class="service-image"
							src={service.images[0]}
							alt={service.title}
							style="margin-bottom: 8px; max-height: 300px; object-fit: cover; width: 100%; border-radius: 4px;"
						/>
						<h3 class="service-title">{service.title}</h3>
						<p class="service-desc">{service.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
    .card{
		border-width: 3px;
	}
	
	.service-title {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}

	.service-desc {
		color: var(--color-muted);
		font-size: 0.95rem;
		margin: 0;
	}
</style>
