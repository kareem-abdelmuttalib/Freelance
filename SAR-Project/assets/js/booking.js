const bookingForm = document.getElementById('booking-form');
const resourceList = document.querySelector('.resource-list');

const sampleResources = ['Projector', 'Sound System', 'Stage Lights', 'Refreshments', 'Security'];

const renderResources = () => {
  if (!resourceList) return;
  resourceList.innerHTML = '';
  sampleResources.forEach(res => {
    const item = document.createElement('div');
    item.className = 'pill';
    item.innerHTML = `<span>•</span>${res}`;
    resourceList.appendChild(item);
  });
};

if (bookingForm) {
  renderResources();
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(bookingForm);
    const summary = `
      <p><strong>Booking Confirmed</strong></p>
      <ul style="list-style:none;padding:0;margin:0;display:grid;gap:6px;">
        <li><span style="color:#c2c2c2;">Event:</span> ${formData.get('event')}</li>
        <li><span style="color:#c2c2c2;">Type:</span> ${formData.get('type')}</li>
        <li><span style="color:#c2c2c2;">Location:</span> ${formData.get('location')}</li>
        <li><span style="color:#c2c2c2;">Date:</span> ${formData.get('date')}</li>
        <li><span style="color:#c2c2c2;">Time:</span> ${formData.get('time')}</li>
      </ul>
    `;
    window.SAR?.showModal({ title: 'Booking submitted', body: summary });
    bookingForm.reset();
  });
}

