/**
 * use:countUp — animates a number from 0 to its target value once the
 * element scrolls into view. Reads the target from the element's own
 * text content, preserving any non-numeric prefix/suffix (e.g. "35+",
 * "2,000+", "100%").
 *
 * Usage: <div class="stat-value" use:countUp>35+</div>
 */
export function countUp(node, options = {}) {
	const { duration = 1200 } = options;
	const raw = node.textContent.trim();
	const match = raw.match(/-?[\d,]+(\.\d+)?/);

	if (!match || typeof IntersectionObserver === 'undefined') {
		return {};
	}

	const numStr = match[0].replace(/,/g, '');
	const target = parseFloat(numStr);
	const prefix = raw.slice(0, match.index);
	const suffix = raw.slice(match.index + match[0].length);
	const hasComma = match[0].includes(',');
	const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;

	const format = (n) => {
		let s = decimals ? n.toFixed(decimals) : Math.round(n).toString();
		if (hasComma) s = Number(s).toLocaleString('en-IN');
		return prefix + s + suffix;
	};

	if (
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	) {
		return {};
	}

	let started = false;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting && !started) {
					started = true;
					const start = performance.now();
					const tick = (now) => {
						const progress = Math.min((now - start) / duration, 1);
						const eased = 1 - Math.pow(1 - progress, 3);
						node.textContent = format(target * eased);
						if (progress < 1) requestAnimationFrame(tick);
					};
					node.textContent = format(0);
					requestAnimationFrame(tick);
					observer.unobserve(node);
				}
			}
		},
		{ threshold: 0.4 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}