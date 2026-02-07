document.addEventListener('DOMContentLoaded', () => {
    const bgClasses = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6'];
    const bgLayer = document.getElementById('bg-layer');
    const FADE_DURATION = 300; // ms

    async function setBgFromElement(el, withFade = false) {
        if (!bgLayer) return;
        
        const target = el && el.dataset && el.dataset.bg ? el.dataset.bg : null;
        if (!target || !bgClasses.includes(target)) return;
        
        // if already on this bg, skip
        if (bgLayer.classList.contains(target)) return;
        
        if (withFade) {
            // fade out
            bgLayer.style.transition = `opacity ${FADE_DURATION}ms ease`;
            bgLayer.style.opacity = '0';
            
            // wait for fade out, then switch background
            await new Promise(resolve => setTimeout(resolve, FADE_DURATION));
        }
        
        // remove existing bg classes and add new one
        bgClasses.forEach(c => bgLayer.classList.remove(c));
        bgLayer.classList.add(target);
        
        if (withFade) {
            // fade in
            bgLayer.style.opacity = '1';
            await new Promise(resolve => setTimeout(resolve, FADE_DURATION));
            bgLayer.style.transition = `opacity 0.5s ease, background-image 0.5s ease`;
        }
    }

    // initialize background from current active pass (no fade on load)
    const initial = document.querySelector('.pass.active');
    setBgFromElement(initial, false);

    const passnext = document.querySelectorAll('.next-btn');
    passnext.forEach(button => {
        button.addEventListener('click', function () {
            const active = document.querySelector('.pass.active');
            const nextpassId = 'pass-' + this.getAttribute('data-pass');
            const nextEl = document.getElementById(nextpassId);

            if (!nextEl || !active) return;

            active.classList.remove('active');
            nextEl.classList.add('active');

            // fade background transition when moving to next pass
            setBgFromElement(nextEl, true);
        });
    });
});
