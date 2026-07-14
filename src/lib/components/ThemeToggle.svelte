<script>
    let mode = $state('light');

    if (typeof document !== 'undefined') {
        mode = document.documentElement.getAttribute('data-mode') || 'light';
    }

    function toggle() {
        mode = mode === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-mode', mode);
        try {
            localStorage.setItem('color-mode', mode);
        } catch (e) {
            /* private browsing / storage disabled — mode just won't persist */
        }
    }
</script>

<button
    class="mode-toggle"
    onclick={toggle}
    aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    data-mode={mode}
>
    <svg class="sun-moon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <mask id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle class="mask-circle" cx="24" cy="4" r="7" fill="black" />
        </mask>
        
        <circle class="sun-core" cx="12" cy="12" r="5" mask="url(#moon-mask)" fill="currentColor" />
        
        <g class="sun-rays">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
    </svg>
</button>

<style>
    .mode-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: var(--border-width) solid var(--color-border);
        background: var(--color-surface);
        color: var(--color-text);
        cursor: pointer;
        overflow: hidden;
        /* Using transition only on transforms/opacity properties for peak performance */
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .mode-toggle:active {
        transform: scale(0.95);
    }

    /* --- High Performance SVG Animation Mechanics --- */
    
    .sun-moon-svg {
        transform-origin: center;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .sun-core, .sun-rays, .mask-circle {
        transform-origin: center;
        transition: 
            transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.3s ease;
    }

    /* Light Mode States (Default Layout) */
    [data-mode="light"] .sun-moon-svg {
        transform: rotate(40deg);
    }

    /* Dark Mode States */
    [data-mode="dark"] .sun-moon-svg {
        transform: rotate(-10deg);
    }

    [data-mode="dark"] .sun-core {
        /* Scale up the core circle slightly so the moon body looks robust */
        transform: scale(1.3);
    }

    [data-mode="dark"] .mask-circle {
        /* Move the mask cut-out circle perfectly into the core to form a crescent moon */
        transform: translate(-8px, 5px);
    }

    [data-mode="dark"] .sun-rays {
        /* Spin and vanish the rays concurrently */
        transform: rotate(45deg) scale(0.1);
        opacity: 0;
    }
</style>