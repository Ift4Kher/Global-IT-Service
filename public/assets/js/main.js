/**
 * Global IT - Main Application Entry Point
 * Bootstraps navigation, animations, services, and form handlers
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  console.log('[Global IT] Initializing modern web application...');

  if (window.GlobalITNav && typeof window.GlobalITNav.init === 'function') {
    window.GlobalITNav.init();
  }

  if (window.GlobalITServices && typeof window.GlobalITServices.init === 'function') {
    window.GlobalITServices.init();
  }

  if (window.GlobalITContact && typeof window.GlobalITContact.init === 'function') {
    window.GlobalITContact.init();
  }

  if (window.GlobalITNewsletter && typeof window.GlobalITNewsletter.init === 'function') {
    window.GlobalITNewsletter.init();
  }

  if (window.GlobalITAnimations && typeof window.GlobalITAnimations.init === 'function') {
    window.GlobalITAnimations.init();
  }

  console.log('[Global IT] Application initialized successfully.');
});
