<script>
	let { images, alt = '' } = $props();
	let index = $state(0);
	const go = (i) => (index = (i + images.length) % images.length);
</script>

<div class="carousel">
	<div class="stage">
		<img src={images[index].src ?? images[index]} alt={images[index].alt ?? alt} />
		{#if images.length > 1}
			<button class="nav prev" onclick={() => go(index - 1)} aria-label="Previous image">‹</button>
			<button class="nav next" onclick={() => go(index + 1)} aria-label="Next image">›</button>
		{/if}
	</div>
	{#if images.length > 1}
		<div class="dots">
			{#each images as _, i}
				<button class="dot" class:active={i === index} onclick={() => go(i)} aria-label="Image {i + 1}"></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.stage {
		position: relative;
		border-radius: var(--radius);
		overflow: hidden;
		border: var(--border-width) solid var(--color-border);
	}
	.stage img { width: 100%; height: 100%; object-fit: cover; }
	.nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 42px;
		height: 42px;
		border-radius: 50%;
		border: none;
		background: rgba(0, 0, 0, 0.4);
		color: #fff;
		font-size: 1.5rem;
		cursor: pointer;
	}
	.prev { left: 12px; }
	.next { right: 12px; }
	.dots { display: flex; justify-content: center; gap: 8px; margin-top: 14px; }
	.dot {
		width: 8px; height: 8px; border-radius: 50%; border: none;
		background: var(--color-border); cursor: pointer; padding: 0;
	}
	.dot.active { background: var(--color-primary); transform: scale(1.3); }
</style>