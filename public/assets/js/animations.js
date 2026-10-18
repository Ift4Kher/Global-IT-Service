/**
 * Global IT - Animations Module
 * Native scroll reveals and staggered micro-animations
 */

(function () {
  'use strict';

  function initAnimations() {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!('IntersectionObserver' in window)) return;

    const revealElements = document.querySelectorAll('.service-card, .process-step, #contact-form');

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-4');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => {
      el.classList.add('transition-all', 'duration-500', 'opacity-0', 'translate-y-4');
      revealObserver.observe(el);
    });
  }

  window.GlobalITAnimations = { init: initAnimations };
})();
