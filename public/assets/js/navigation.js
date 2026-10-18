/**
 * Global IT - Navigation Module
 * Handles desktop active states, sticky header, mobile drawer, and back-to-top
 */

(function () {
  'use strict';

  function initNavigation() {
    const header = document.getElementById('main-header');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconBars = document.getElementById('menu-icon-bars');
    const iconClose = document.getElementById('menu-icon-close');
    const backToTopBtn = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('#desktop-navigation .nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // 1. Mobile Menu Toggle
    function toggleMobileMenu(isOpen) {
      const willOpen = typeof isOpen === 'boolean' ? isOpen : mobileMenu.classList.contains('hidden');
      
      if (willOpen) {
        mobileMenu.classList.remove('hidden');
        mobileToggle.setAttribute('aria-expanded', 'true');
        iconBars.style.setProperty('display', 'none', 'important');
        iconClose.style.setProperty('display', 'inline-block', 'important');
      } else {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
        iconBars.style.setProperty('display', 'inline-block', 'important');
        iconClose.style.setProperty('display', 'none', 'important');
      }
    }

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => toggleMobileMenu());

      // Close mobile menu when a mobile nav link is clicked
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
          toggleMobileMenu(false);
          mobileToggle.focus();
        }
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
          if (!mobileMenu.classList.contains('hidden')) {
            toggleMobileMenu(false);
          }
        }
      });
    }

    // 2. Sticky Header elevation on scroll
    function handleScroll() {
      const scrollY = window.scrollY;

      if (header) {
        if (scrollY > 20) {
          header.classList.add('shadow-md', 'py-1');
        } else {
          header.classList.remove('shadow-md', 'py-1');
        }
      }

      // Back-to-top button visibility
      if (backToTopBtn) {
        if (scrollY > 400) {
          backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
          backToTopBtn.classList.add('opacity-100');
        } else {
          backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
          backToTopBtn.classList.remove('opacity-100');
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 3. Back to Top Smooth Scroll
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // 4. Active Navigation Observer
    const observedSections = ['services', 'why-choose-us', 'contact'];
    const sectionElements = observedSections
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if ('IntersectionObserver' in window && sectionElements.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      };

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
              } else if (id === 'services' && (href === '#services' || link.id === 'nav-services')) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      }, observerOptions);

      sectionElements.forEach(el => sectionObserver.observe(el));
    }
  }

  window.GlobalITNav = { init: initNavigation };
})();
