<script>
	import clientData from '$lib/data/client.json';
	import Nav from '$lib/components/Nav.svelte';
	import HeroSplit from '$lib/components/HeroSplit.svelte';
	import HeroCentered from '$lib/components/HeroCentered.svelte';
	import HeroBold from '$lib/components/HeroBold.svelte';
	import About from '$lib/components/About.svelte';
	import Services from '$lib/components/Services.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import TestimonialsGrid from '$lib/components/TestimonialsGrid.svelte';
	import TestimonialsQuote from '$lib/components/TestimonialsQuote.svelte';
	import TestimonialsCarousel from '$lib/components/TestimonialsCarousel.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const { business, hero, about, services, gallery, testimonials } = clientData;

	// Each theme gets its own hero composition and testimonials layout —
	// not just different colors, but a genuinely different structure —
	// so sites built from different themes don't read as the same template.
</script>

<Nav {business} />

{#if business.theme === 'clinical'}
	<HeroCentered {hero} {business} stats={about.stats} />
{:else if business.theme === 'pulse'}
	<HeroBold {hero} {business} ticker={hero.ticker} />
{:else}
	<HeroSplit {hero} {business} />
{/if}

<About {about} />
<Services {services} />
<Gallery {gallery} />

{#if business.theme === 'clinical'}
	<TestimonialsQuote {testimonials} />
{:else if business.theme === 'pulse'}
	<TestimonialsCarousel {testimonials} />
{:else}
	<TestimonialsGrid {testimonials} />
{/if}

<Contact {business} />
<Footer {business} />