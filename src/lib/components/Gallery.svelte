<script>
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal.js';

	let { gallery } = $props(); // { groups: [{ name, images: [{src,alt}] }] }
	// svelte-ignore state_referenced_locally
	const groups = gallery.groups;

	let faceIndex = $state(groups.map(() => 0));
	let activeGroup = $state(null); // index into groups
	let activeIndex = $state(null); // index into that group's images

	onMount(() => {
		const timer = setInterval(() => {
			faceIndex = faceIndex.map((f, gi) =>
				groups[gi].images.length ? (f + 1) % groups[gi].images.length : 0
			);
		}, 2200);
		return () => clearInterval(timer);
	});

	function openGroup(gi) {
		activeGroup = gi;
		activeIndex = 0;
	}
	function close() {
		activeGroup = null;
		activeIndex = null;
	}
	function next(e) {
		e?.stopPropagation();
		activeIndex = (activeIndex + 1) % groups[activeGroup].images.length;
	}
	function prev(e) {
		e?.stopPropagation();
		activeIndex = (activeIndex - 1 + groups[activeGroup].images.length) % groups[activeGroup].images.length;
	}
	function onKeydown(e) {
		if (activeGroup === null) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowRight') next();
		if (e.key === 'ArrowLeft') prev();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<section class="section" id="gallery">
	<div class="container">
		<span class="section-kicker reveal" use:reveal>Our Work</span>
		<h2 class="section-title reveal" use:reveal={{ delay: 60 }}>Gallery</h2>

		<div class="cube-grid">
			{#each groups as group, gi}
				<button
					class="cube reveal"
					use:reveal={{ delay: gi * 100 }}
					onclick={() => openGroup(gi)}
					aria-label="View {group.name} photos"
				>
					{#each group.images as img, ii}
						<img
							src={img.src}
							alt={img.alt}
							class="cube-face"
							class:active={ii === faceIndex[gi]}
						/>
					{/each}
					<span class="cube-label">{group.name} ({group.images.length})</span>
				</button>
			{/each}
		</div>
	</div>
</section>

{#if activeGroup !== null}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="lightbox" onclick={close} role="dialog" aria-modal="true" aria-label="Image viewer" tabindex="-1">
		<button class="lightbox-close" onclick={close} aria-label="Close">✕</button>
		<button class="lightbox-nav lightbox-prev" onclick={prev} aria-label="Previous image">‹</button>
		<div class="lightbox-stage" role="presentation" onclick={(e) => e.stopPropagation()}>
			<img class="lightbox-img" src={groups[activeGroup].images[activeIndex].src} alt={groups[activeGroup].images[activeIndex].alt} />
			<p class="lightbox-caption">{groups[activeGroup].name} — {activeIndex + 1} / {groups[activeGroup].images.length}</p>
		</div>
		<button class="lightbox-nav lightbox-next" onclick={next} aria-label="Next image">›</button>
	</div>
{/if}

<style>
	.cube-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 20px;
	}
	.cube {
		position: relative;
		aspect-ratio: 4 / 3;
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius);
		overflow: hidden;
		padding: 0;
		cursor: pointer;
		background: var(--color-surface);
	}
	.cube-face {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transform: scale(1.04);
		transition: opacity 0.9s ease, transform 6s ease;
	}
	.cube-face.active {
		opacity: 1;
		transform: scale(1);
	}
	.cube-label {
		position: absolute;
		left: 12px;
		bottom: 12px;
		z-index: 2;
		background: rgba(0, 0, 0, 0.55);
		color: #fff;
		font-size: 0.8rem;
		font-weight: 600;
		padding: 6px 12px;
		border-radius: 999px;
	}
	.lightbox {
		position: fixed; inset: 0; z-index: 100;
		background: rgba(0,0,0,0.88);
		display: flex; align-items: center; justify-content: center;
		padding: 24px;
	}
	.lightbox-stage { text-align: center; }
	.lightbox-img { max-width: min(90vw, 1000px); max-height: 80vh; object-fit: contain; border-radius: 6px; }
	.lightbox-caption { color: #fff; margin-top: 10px; font-size: 0.9rem; }
	.lightbox-close, .lightbox-nav {
		position: absolute; background: rgba(255,255,255,0.12); color: #fff;
		border: none; cursor: pointer; border-radius: 50%;
		display: flex; align-items: center; justify-content: center;
	}
	.lightbox-close { top: 20px; right: 20px; width: 42px; height: 42px; font-size: 1.1rem; }
	.lightbox-nav { top: 50%; transform: translateY(-50%); width: 52px; height: 52px; font-size: 2rem; }
	.lightbox-prev { left: 16px; }
	.lightbox-next { right: 16px; }

	@media (prefers-reduced-motion: reduce) {
		.cube-face { transition: opacity 0.3s ease; transform: none; }
	}
</style>