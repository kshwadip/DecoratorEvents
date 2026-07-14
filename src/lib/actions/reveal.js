/**
 * use:reveal — adds the `is-visible` class (see `.reveal` in base.css)
 * once an element scrolls into view. Add `class="reveal"` on the element
 * for the fade/slide-up styles, or pass a different base class via options.
 *
 * Usage: <div class="reveal" use:reveal>...</div>
 * Stagger children: <div class="reveal" use:reveal={{ delay: 120 }}>
 */
export function reveal(node, options = {}) {
	const { delay = 0, threshold = 0.15 } = options;

	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-visible');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					setTimeout(() => node.classList.add('is-visible'), delay);
					observer.unobserve(node);
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -60px 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}