const modal = document.getElementById('history-modal');
const modalBody = document.querySelector('#history-modal .modal-content');

const events = [
  {
    title: 'AI Innovation Sprint',
    date: 'March 2025',
    image: './assets/images/activity1.svg',
    details: 'Teams built ML-powered campus helpers within 48 hours.',
  },
  {
    title: 'Green Campus Drive',
    date: 'January 2025',
    image: './assets/images/activity2.svg',
    details: 'Community clean-up and tree plantation around the lake.',
  },
  {
    title: 'Cultural Fusion Night',
    date: 'December 2024',
    image: './assets/images/event-placeholder.svg',
    details: 'Music, theatre, and food festival celebrating diversity.',
  },
];

const gallery = document.querySelector('.gallery');

const renderGallery = () => {
  if (!gallery) return;
  gallery.innerHTML = '';
  events.forEach((ev, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${ev.image}" alt="${ev.title}">
      <div class="card-body">
        <div class="badge">${ev.date}</div>
        <h3>${ev.title}</h3>
        <p>${ev.details}</p>
        <button class="btn btn-outline" data-idx="${idx}">View details</button>
      </div>
    `;
    gallery.appendChild(card);
  });
};

const openModal = idx => {
  const ev = events[idx];
  if (!modal || !ev) return;
  modalBody.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
      <h3 style="margin:0;">${ev.title}</h3>
      <button class="btn btn-outline" id="close-modal">Close</button>
    </div>
    <p style="color:#b7c4dd;">${ev.date}</p>
    <img src="${ev.image}" alt="${ev.title}" style="border-radius:14px; margin:12px 0;">
    <p>${ev.details}</p>
  `;
  modal.classList.add('active');
  modal.querySelector('#close-modal').addEventListener('click', closeModal);
};

const closeModal = () => modal?.classList.remove('active');

if (gallery) {
  renderGallery();
  gallery.addEventListener('click', e => {
    if (e.target.matches('button[data-idx]')) {
      const idx = Number(e.target.dataset.idx);
      openModal(idx);
    }
  });
}

if (modal) {
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
}

