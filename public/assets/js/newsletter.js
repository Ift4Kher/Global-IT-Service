/**
 * Global IT - Newsletter Module
 * Handles footer newsletter subscription validation and API submission
 */

(function () {
  'use strict';

  function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    const emailInput = document.getElementById('newsletter-email');
    const msg = document.getElementById('newsletter-msg');
    const submitBtn = document.getElementById('newsletter-submit-btn');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'text-xs mt-1.5 text-rose-400 block';
        return;
      }

      submitBtn.disabled = true;
      msg.textContent = 'Subscribing...';
      msg.className = 'text-xs mt-1.5 text-slate-400 block';

      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (res.ok && data.success) {
          msg.textContent = data.message || 'Subscribed successfully!';
          msg.className = 'text-xs mt-1.5 text-brand-cyan block font-medium';
          form.reset();
        } else {
          msg.textContent = data.message || 'Subscription failed. Please try again.';
          msg.className = 'text-xs mt-1.5 text-rose-400 block';
        }
      } catch (err) {
        msg.textContent = 'Unable to subscribe. Please try again.';
        msg.className = 'text-xs mt-1.5 text-rose-400 block';
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  window.GlobalITNewsletter = { init: initNewsletter };
})();
