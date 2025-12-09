document.addEventListener('DOMContentLoaded', () => {
  // Global loader overlay
  const loader = document.createElement('div');
  loader.className = 'page-loader visible';
  loader.innerHTML = `
    <div class="loader-dots" aria-label="Loading" role="status">
      <span></span><span></span><span></span>
    </div>
  `;
  document.body.appendChild(loader);

  const showLoader = () => loader.classList.add('visible');
  const hideLoader = () => loader.classList.remove('visible');

  // Simulate readiness after assets settle
  const readyDelay = 700;
  window.addEventListener('load', () => {
    setTimeout(hideLoader, readyDelay);
  });

  // Smooth page transitions for internal links
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || link.target === '_blank') return;
      if (href.startsWith('#')) return; // anchor handled separately
      e.preventDefault();
      showLoader();
      setTimeout(() => {
        window.location.href = href;
      }, 220);
    });
  });

  // Global modal factory
  const modal = document.createElement('div');
  modal.className = 'modal global-modal';
  modal.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true" aria-live="polite">
      <div class="modal-head">
        <h3 id="modal-title">Notice</h3>
        <button class="btn btn-outline" id="modal-close" aria-label="Close modal">Close</button>
      </div>
      <div id="modal-body" class="modal-body"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalTitle = modal.querySelector('#modal-title');
  const modalBody = modal.querySelector('#modal-body');
  const modalClose = modal.querySelector('#modal-close');

  const closeModal = () => modal.classList.remove('active');
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  window.SAR = window.SAR || {};
  window.SAR.showModal = ({ title, body }) => {
    modalTitle.textContent = title;
    modalBody.innerHTML = body;
    modal.classList.add('active');
    modalClose.focus();
  };
  window.SAR.hideModal = closeModal;

  // Scroll animation observer
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // Counter animation
  const animateValue = (el, target) => {
    const duration = 1200;
    const start = 0;
    const startTime = performance.now();
    const step = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = Number(entry.target.dataset.counter) || 0;
          animateValue(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Tiny parallax on hero art
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', e => {
      const bounds = hero.getBoundingClientRect();
      const x = (e.clientX - bounds.left) / bounds.width - 0.5;
      const y = (e.clientY - bounds.top) / bounds.height - 0.5;
      hero.style.transform = `translateY(${-y * 4}px) rotateX(${y * 2}deg) rotateY(${x * 2}deg)`;
    });
    hero.addEventListener('mouseleave', () => {
      hero.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  }

  // Newsletter mock submit
  const newsletter = document.querySelector('.newsletter form');
  if (newsletter) {
    newsletter.addEventListener('submit', e => {
      e.preventDefault();
      const email = newsletter.querySelector('input[type="email"]')?.value || '';
      window.SAR?.showModal({
        title: 'Subscribed',
        body: `<p>Weekly highlights will arrive soon at ${email}.</p>`,
      });
      newsletter.reset();
    });
  }
});

