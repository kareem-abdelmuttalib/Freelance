const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = contactForm.elements.name.value.trim();
    const email = contactForm.elements.email.value.trim();
    const message = contactForm.elements.message.value.trim();
    if (!name || !email || !message) {
      window.SAR?.showModal({ title: 'Missing info', body: '<p>Please fill in all fields to contact SAR.</p>' });
      return;
    }
    window.SAR?.showModal({
      title: 'Message sent',
      body: `<p>Thanks ${name}! We will reply to ${email} soon.</p>`,
    });
    contactForm.reset();
  });
}

