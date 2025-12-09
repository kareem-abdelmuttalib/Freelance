const calendarGrid = document.querySelector('.calendar-grid');
const monthLabel = document.getElementById('month-label');
const viewButtons = document.querySelectorAll('.view-switcher button');

const now = new Date();
let currentView = 'month';
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();

const eventsMap = [
  { date: new Date(currentYear, currentMonth, 4), title: 'Robotics Workshop' },
  { date: new Date(currentYear, currentMonth, 10), title: 'Football Finals' },
  { date: new Date(currentYear, currentMonth, 15), title: 'Design Sprint' },
  { date: new Date(currentYear, currentMonth, 22), title: 'Debate Championship' },
];

const getMonthName = (m = currentMonth) =>
  new Date(currentYear, m, 1).toLocaleString('default', { month: 'long' });

const renderMonth = () => {
  calendarGrid.innerHTML = '';
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarGrid.appendChild(document.createElement('div'));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.className = 'day';
    cell.innerHTML = `<div class="date">${day}</div>`;

    eventsMap
      .filter(ev => ev.date.getDate() === day && ev.date.getMonth() === currentMonth)
      .forEach(ev => {
        const evEl = document.createElement('div');
        evEl.className = 'event';
        evEl.textContent = ev.title;
        cell.appendChild(evEl);
      });

    calendarGrid.appendChild(cell);
  }
  monthLabel.textContent = `${getMonthName()} ${currentYear}`;
};

const renderWeek = () => {
  calendarGrid.innerHTML = '';
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  monthLabel.textContent = `Week of ${startOfWeek.toLocaleDateString()}`;

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + i);
    const cell = document.createElement('div');
    cell.className = 'day';
    cell.innerHTML = `<div class="date">${dayDate.toLocaleString('default', {
      weekday: 'short',
    })} ${dayDate.getDate()}</div>`;

    eventsMap
      .filter(ev => ev.date.toDateString() === dayDate.toDateString())
      .forEach(ev => {
        const evEl = document.createElement('div');
        evEl.className = 'event';
        evEl.textContent = ev.title;
        cell.appendChild(evEl);
      });

    calendarGrid.appendChild(cell);
  }
};

const renderYear = () => {
  calendarGrid.innerHTML = '';
  monthLabel.textContent = `${currentYear} Overview`;
  for (let m = 0; m < 12; m++) {
    const cell = document.createElement('div');
    cell.className = 'day';
    cell.innerHTML = `<div class="date">${getMonthName(m)}</div>`;
    eventsMap
      .filter(ev => ev.date.getMonth() === m)
      .forEach(ev => {
        const evEl = document.createElement('div');
        evEl.className = 'event';
        evEl.textContent = `${ev.title} (${ev.date.getDate()} ${getMonthName(m).slice(0, 3)})`;
        cell.appendChild(evEl);
      });
    calendarGrid.appendChild(cell);
  }
};

const renderView = () => {
  if (currentView === 'week') return renderWeek();
  if (currentView === 'year') return renderYear();
  return renderMonth();
};

viewButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    viewButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentView = btn.dataset.view;
    renderView();
  });
});

document.getElementById('prev-month')?.addEventListener('click', () => {
  currentMonth -= 1;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear -= 1;
  }
  renderMonth();
});

document.getElementById('next-month')?.addEventListener('click', () => {
  currentMonth += 1;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear += 1;
  }
  renderMonth();
});

if (calendarGrid) {
  renderView();
}

