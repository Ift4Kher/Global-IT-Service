/**
 * Global IT - Services Module
 * Retrieves services via REST API, manages dynamic service details modal and inquiries
 */

(function () {
  'use strict';

  const iconMap = {
    'server': 'fa-solid fa-server',
    'cloud': 'fa-solid fa-cloud',
    'wrench': 'fa-solid fa-screwdriver-wrench',
    'shopping-cart': 'fa-solid fa-cart-shopping',
    'users': 'fa-solid fa-users',
    'shield-check': 'fa-solid fa-shield-halved'
  };

  let servicesCache = [];

  function initServices() {
    const modal = document.getElementById('service-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalCloseAction = document.getElementById('modal-close-action');
    const modalTitle = document.getElementById('modal-service-title');
    const modalImage = document.getElementById('modal-service-image');
    const modalContent = document.getElementById('modal-service-content');
    const modalIcon = document.getElementById('modal-service-icon');
    const modalCta = document.getElementById('modal-service-cta');

    // 1. Fetch live services from backend REST API
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.data)) {
          servicesCache = data.data;
        }
      })
      .catch(err => {
        console.warn('[Services Module] Using initial markup fallback:', err.message);
      });

    // 2. Open Modal Handler
    async function openServiceModal(slug) {
      let service = servicesCache.find(s => s.slug === slug);

      // If not yet in cache, fetch directly
      if (!service) {
        try {
          const res = await fetch(`/api/services/${slug}`);
          const json = await res.json();
          if (json.success && json.data) {
            service = json.data;
          }
        } catch (e) {
          console.error('[Service Fetch Error]', e);
        }
      }

      if (!service) {
        // Fallback info from DOM card
        const card = document.querySelector(`.service-card[data-slug="${slug}"]`);
        if (card) {
          service = {
            title: card.querySelector('h3').textContent.trim(),
            description: card.querySelector('p').textContent.trim(),
            detailed_content: card.querySelector('p').textContent.trim(),
            image_path: card.querySelector('img').getAttribute('src'),
            slug: slug
          };
        }
      }

      if (service && modal) {
        modalTitle.textContent = service.title;
        modalImage.src = service.image_path || '/assets/images/hero-it-services.webp';
        modalImage.alt = service.title;
        
        // Detailed content paragraphs
        const fullText = service.detailed_content || service.description;
        modalContent.innerHTML = `
          <p class="font-medium text-slate-800">${service.description}</p>
          <p class="text-slate-600 leading-relaxed">${fullText}</p>
          <div class="mt-4 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
            <i class="fa-solid fa-circle-check text-brand-blue text-lg" aria-hidden="true"></i>
            <span class="text-xs sm:text-sm font-semibold text-brand-navy">Included in Global IT Enterprise Service Level Agreements (SLAs) with 24/7 proactive monitoring.</span>
          </div>
        `;

        // Update modal icon
        const iconClass = iconMap[service.icon_name] || 'fa-solid fa-server';
        modalIcon.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i>`;

        // Modal CTA binds to contact form
        modalCta.onclick = function (e) {
          e.preventDefault();
          closeModal();
          const select = document.getElementById('service_interest');
          if (select) {
            // Find option matching title
            for (let i = 0; i < select.options.length; i++) {
              if (select.options[i].text.toLowerCase().includes(service.title.toLowerCase()) || 
                  service.title.toLowerCase().includes(select.options[i].text.toLowerCase())) {
                select.selectedIndex = i;
                break;
              }
            }
          }
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              const nameInput = document.getElementById('name');
              if (nameInput) nameInput.focus();
            }, 600);
          }
        };

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeModal() {
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }

    // Bind all "Learn More" buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.service-detail-btn');
      if (btn) {
        e.preventDefault();
        const slug = btn.getAttribute('data-slug');
        if (slug) openServiceModal(slug);
      }
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalCloseAction) modalCloseAction.addEventListener('click', closeModal);

    // Close on outside backdrop click
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  window.GlobalITServices = { init: initServices };
})();
