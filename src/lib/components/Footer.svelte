<script>
	let { business } = $props();
	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container footer-inner">
		<span>© {year} {business.name}</span>
		<div class="social-links">
			{#if business.x}
				<a
					href={business.x}
					target="_blank"
					rel="noopener noreferrer"
					class="social-link"
					aria-label="X (formerly Twitter)"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						width="20"
						height="20"
					>
						<!-- X Logo Path -->
						<path
							fill="currentColor"
							d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L197.5 279 25 48h145.6l100.5 132.9L389.2 48zm-24.8 373.8h39.1L151.1 88h-42l255.3 333.8z"
						/>
					</svg>
				</a>
			{/if}
			{#if business.instagram}
				<a
					href={business.instagram}
					target="_blank"
					rel="noopener noreferrer"
					class="social-link"
					aria-label="Instagram"
				>
					<!-- Removed background rect, replaced hardcoded #ffffff with currentColor -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						width="20"
						height="20"
					>
						<!-- Camera Body -->
						<rect
							x="106"
							y="106"
							width="300"
							height="300"
							rx="85"
							fill="none"
							stroke="currentColor"
							stroke-width="30"
						/>

						<!-- Lens / Center Circle -->
						<circle
							cx="256"
							cy="256"
							r="70"
							fill="none"
							stroke="currentColor"
							stroke-width="30"
						/>

						<!-- Flash / Top Right Dot -->
						<circle cx="345" cy="167" r="22" fill="currentColor" />
					</svg>
				</a>
			{/if}
			{#if business.facebook}
				<a
					href={business.facebook}
					target="_blank"
					rel="noopener noreferrer"
					class="social-link"
					aria-label="Facebook"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						width="20"
						height="20"
					>
						<!-- Facebook 'f' Logo Path -->
						<path
							fill="currentColor"
							d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.38 19.12-40.38 38.73V256h68.75l-11 71.69h-57.75V501C413.31 482.38 504 379.78 504 256z"
						/>
					</svg>
				</a>
			{/if}
			{#if business.youtube}
				<a
					href={business.youtube}
					target="_blank"
					rel="noopener noreferrer"
					class="social-link"
					aria-label="YouTube"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 576 512"
						width="20"
						height="20"
					>
						<!-- YouTube Play Button Path -->
						<path
							fill="currentColor"
							d="M549.655 124.083c-6.281-23.65-24.787-42.256-48.418-48.418C456.281 64 288 64 288 64s-168.281 0-213.237 11.665c-23.631 6.162-42.137 24.768-48.418 48.418C16 168.039 16 256 16 256s0 87.961 10.345 131.917c6.281 23.65 24.787 42.256 48.418 48.418C119.719 448 288 448 288 448s168.281 0 213.237-11.665c23.631-6.162 42.137-24.768 48.418-48.418C560 343.961 560 256 560 256s0-87.961-10.345-131.917zM232 334V178l142 78-142 78z"
						/>
					</svg>
				</a>
			{/if}
		</div>
		<span class="made-by">Website by <a href="https://kshwadip.vercel.app" class="kLogo">K</a></span>
	</div>
</footer>

<style>
	.footer {
		border-top: var(--border-width) solid var(--color-border);
		padding: 24px 0;
	}

	.footer-inner {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 8px;
		font-size: 0.85rem;
		color: var(--color-muted);
	}

	/* Style the anchor to inherit color and smoothly transition colors */
	.social-links {
		display: flex;
		gap: 8px;
		color: var(--color-primary);
		display: inline-flex;
		align-items: center;
	}

    .kLogo {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 800; font-size: 20px;
        color: #E8A435; text-decoration: none;
        letter-spacing: -0.02em;
	}
</style>
