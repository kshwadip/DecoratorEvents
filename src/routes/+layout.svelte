<script>
	import '../lib/themes/base.css';
	import '../lib/themes/editorial.css';
	import '../lib/themes/clinical.css';
	import '../lib/themes/pulse.css';
	import clientData from '$lib/data/client.json';

	let { children } = $props();
	const { business, seo } = clientData;

	// Google Fonts used across the three themes. Loading all three theme
	// font sets costs little (small text files) and means you never have
	// to touch this file when switching a client's theme.
	const fontHref =
		'https://fonts.googleapis.com/css2?family=Spectral:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Oswald:wght@500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': seo.businessType || 'LocalBusiness',
		name: business.name,
		telephone: business.phone,
		email: business.email,
		address: business.address,
		url: ''
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link rel="stylesheet" href={fontHref} />

	<!-- Open Graph -->
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:type" content="business.business" />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="app-shell" data-theme={business.theme}>
	{@render children()}
</div>