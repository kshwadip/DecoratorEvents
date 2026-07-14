<script>
	import ThemeToggle from "./ThemeToggle.svelte";

	let { business } = $props();
	let open = $state(false);
	let scrolled = $state(false);

	function onScroll() {
		scrolled = window.scrollY > 12;
	}

	$effect(() => {
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	});

	const links = [
		{ href: "#about", label: "About" },
		{ href: "#services", label: "Services" },
		{ href: "#gallery", label: "Gallery" },
		{ href: "#testimonials", label: "Reviews" },
		{ href: "#contact", label: "Contact" },
	];
</script>

<header class="nav" class:scrolled>
	<div class="container nav-inner">
		<a href="/" class="brand">{business.name}</a>

		<nav class="links" class:open>
			{#each links as link}
				<a href={link.href} onclick={() => (open = false)}
					>{link.label}</a
				>
			{/each}
		</nav>

		<div class="nav-actions">
			<ThemeToggle />
			<a class="btn btn-accent call-btn" href="tel:{business.phone}"
				>Call {business.phone}</a
			>
			<button
				class="menu-toggle"
				onclick={() => (open = !open)}
				aria-label="Toggle menu"
			>
				{open ? "✕" : "☰"}
			</button>
		</div>
	</div>
</header>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 50;
		background: rgba(var(--shadow-color), 0);
		border-bottom: 1px solid transparent;
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease,
			box-shadow 0.3s ease,
			backdrop-filter 0.3s ease;
	}

	.nav.scrolled {
		background: color-mix(in srgb, var(--color-bg) 82%, transparent);
		backdrop-filter: blur(14px) saturate(1.4);
		-webkit-backdrop-filter: blur(14px) saturate(1.4);
		border-bottom-color: var(--color-border);
		box-shadow: 0 8px 30px -20px rgba(var(--shadow-color), 0.5);
	}

	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 16px;
		padding-bottom: 16px;
	}

	.brand {
		font-family: var(--font-display);
		font-weight: var(--heading-weight);
		font-size: 1.15rem;
		text-decoration: none;
		color: var(--color-text);
		text-transform: var(--heading-transform);
	}

	.links {
		display: flex;
		gap: 28px;
	}

	.links a {
		text-decoration: none;
		font-weight: 500;
		font-size: 0.95rem;
		color: var(--color-muted);
		transition: color 0.2s ease;
	}

	.links a:hover {
		color: var(--color-text);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.call-btn {
		padding: 10px 18px;
		font-size: 0.9rem;
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		font-size: 1.4rem;
		cursor: pointer;
		color: var(--color-text);
	}

	@media (max-width: 780px) {
		.links {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			flex-direction: column;
			background: var(--color-bg);
			border-bottom: 1px solid var(--color-border);
			padding: 16px 24px;
			gap: 16px;
		}
		.links.open {
			display: flex;
		}
		.call-btn {
			display: none;
		}
		.menu-toggle {
			display: block;
		}
	}
</style>
