<script>
	let { business } = $props();

	let waLink = $derived(
		`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
			`Hi, I found ${business.name} online and wanted to ask about your services.`
		)}`
	);
</script>

<section class="section" id="contact">
	<div class="container contact-inner">
		<div class="contact-info">
			<span class="section-kicker">Get In Touch</span>
			<h2 class="section-title">Contact & Location</h2>

			<ul class="info-list">
				<li><strong>Address:</strong> {business.address}</li>
				<li><strong>Phone:</strong> <a href="tel:{business.phone}">{business.phoneDisplay}</a></li>
				<li><strong>Email:</strong> <a href="mailto:{business.email}">{business.email}</a></li>
			</ul>

			<table class="hours">
				<tbody>
					{#each business.hours as h}
						<tr>
							<td>{h.days}</td>
							<td>{h.time}</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<div class="contact-actions">
				<a class="btn btn-primary" href="tel:{business.phone}">Call Now</a>
				<a class="btn btn-outline" href={waLink} target="_blank" rel="noopener">WhatsApp</a>
			</div>
		</div>

		<div class="map-wrap">
			<iframe
				title="{business.name} location"
				src={business.mapEmbedUrl}
				width="100%"
				height="100%"
				style="border:0;"
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>
	</div>
</section>

<style>
	.contact-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		align-items: stretch;
	}

	.info-list {
		list-style: none;
		padding: 0;
		margin: 0 0 24px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.info-list a {
		text-decoration: none;
		border-bottom: 1px solid var(--color-border);
	}

	.hours {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 28px;
	}

	.hours td {
		padding: 8px 0;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.95rem;
	}

	.hours td:last-child {
		text-align: right;
		color: var(--color-muted);
	}

	.contact-actions {
		display: flex;
		gap: 14px;
		flex-wrap: wrap;
	}

	.map-wrap {
		min-height: 340px;
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius);
		overflow: hidden;
	}

	@media (max-width: 780px) {
		.contact-inner {
			grid-template-columns: 1fr;
		}
	}
</style>
