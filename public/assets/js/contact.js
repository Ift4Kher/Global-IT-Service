/**
 * Global IT - Contact Form Module
 * Handles client-side validation, anti-spam, async submission, and UI states
 */

(function () {
  'use strict';

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const alertBox = document.getElementById('contact-alert');
    const submitBtn = document.getElementById('submit-contact-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const companyInput = document.getElementById('company');
    const serviceInput = document.getElementById('service_interest');
    const messageInput = document.getElementById('message');
    const hpInput = document.getElementById('website_hp');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    let isSubmitting = false;

    // Helper: Validate email format
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Helper: Show field error
    function setFieldError(input, errorElement, message) {
      input.classList.add('border-red-500', 'bg-red-50/20');
      input.classList.remove('border-slate-200');
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
      }
    }

    // Helper: Clear field error
    function clearFieldError(input, errorElement) {
      input.classList.remove('border-red-500', 'bg-red-50/20');
      input.classList.add('border-slate-200');
      if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.add('hidden');
      }
    }

    // Real-time error removal on input
    nameInput.addEventListener('input', () => clearFieldError(nameInput, nameError));
    emailInput.addEventListener('input', () => clearFieldError(emailInput, emailError));
    messageInput.addEventListener('input', () => clearFieldError(messageInput, messageError));

    // Show banner alert
    function showAlert(type, message) {
      alertBox.classList.remove('hidden', 'bg-red-50', 'text-red-800', 'border-red-200', 'bg-emerald-50', 'text-emerald-800', 'border-emerald-200');
      if (type === 'success') {
        alertBox.classList.add('bg-emerald-50', 'text-emerald-800', 'border', 'border-emerald-200');
        alertBox.innerHTML = `
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-circle-check text-emerald-600 text-lg"></i>
            <div>
              <p class="font-bold">Inquiry Sent Successfully!</p>
              <p class="text-xs sm:text-sm mt-0.5">${message}</p>
            </div>
          </div>
        `;
      } else {
        alertBox.classList.add('bg-red-50', 'text-red-800', 'border', 'border-red-200');
        alertBox.innerHTML = `
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-triangle-exclamation text-red-600 text-lg"></i>
            <div>
              <p class="font-bold">Unable to Send Message</p>
              <p class="text-xs sm:text-sm mt-0.5">${message}</p>
            </div>
          </div>
        `;
      }
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Submit handler
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (isSubmitting) return;

      // Reset errors
      clearFieldError(nameInput, nameError);
      clearFieldError(emailInput, emailError);
      clearFieldError(messageInput, messageError);
      alertBox.classList.add('hidden');

      let hasErrors = false;

      // Validate Name
      const nameVal = nameInput.value.trim();
      if (!nameVal || nameVal.length < 2) {
        setFieldError(nameInput, nameError, 'Please enter your full name (at least 2 characters).');
        hasErrors = true;
      }

      // Validate Email
      const emailVal = emailInput.value.trim();
      if (!emailVal || !isValidEmail(emailVal)) {
        setFieldError(emailInput, emailError, 'Please enter a valid email address.');
        hasErrors = true;
      }

      // Validate Message
      const messageVal = messageInput.value.trim();
      if (!messageVal || messageVal.length < 10) {
        setFieldError(messageInput, messageError, 'Please write a message of at least 10 characters.');
        hasErrors = true;
      }

      if (hasErrors) return;

      // Prepare payload
      const payload = {
        name: nameVal,
        email: emailVal,
        company: companyInput.value.trim(),
        service_interest: serviceInput.value,
        message: messageVal,
        website_hp: hpInput ? hpInput.value : ''
      };

      // Set Loading UI
      isSubmitting = true;
      submitBtn.disabled = true;
      btnText.classList.add('hidden');
      btnSpinner.classList.remove('hidden');
      btnSpinner.classList.add('flex');

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showAlert('success', data.message || 'Your inquiry has been received. Our team will contact you shortly.');
          form.reset();
        } else {
          // Highlight specific server validation errors if any
          if (Array.isArray(data.errors)) {
            data.errors.forEach(err => {
              if (err.field === 'name') setFieldError(nameInput, nameError, err.message);
              if (err.field === 'email') setFieldError(emailInput, emailError, err.message);
              if (err.field === 'message') setFieldError(messageInput, messageError, err.message);
            });
          }
          showAlert('error', data.message || 'Validation failed. Please review the highlighted fields.');
        }
      } catch (error) {
        console.error('[Contact Form Request Error]', error);
        showAlert('error', 'Network error. Please verify your connection or try again.');
      } finally {
        isSubmitting = false;
        submitBtn.disabled = false;
        btnText.classList.remove('hidden');
        btnSpinner.classList.add('hidden');
        btnSpinner.classList.remove('flex');
      }
    });
  }

  window.GlobalITContact = { init: initContactForm };
})();
