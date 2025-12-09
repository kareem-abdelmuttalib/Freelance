# FCAI Student Activities Repository (SAR)

Modern, responsive front-end for browsing, booking, and tracking student activities at **New Mansoura University · FCAI**. Built with pure **HTML/CSS/JavaScript** featuring glassmorphism, gradients, animations, and a JS-powered calendar.

## Project Idea
- Central hub for activities: discover categories, register once, book events, view history, and check a dynamic calendar.
- Smooth UI: animated hero, scroll reveals, hover interactions, and modal details.
- Fully client-side: no backend required; all interactions are simulated in-browser.

## Technologies
- HTML5 with semantic structure
- CSS3 (Flexbox, Grid, glassmorphism, gradients, responsive units)
- Vanilla JavaScript (form validation, calendar views, modal handling, scroll animations)
- SVG/PNG assets for icons, logo, placeholders, and UML diagrams

## Structure
```
SAR-Project/
├── assets/
│   ├── css/            # Global styling
│   ├── js/             # Page scripts (validation, calendar, modals)
│   ├── images/         # Placeholder visuals
│   ├── icons/          # Custom SVG icons
│   └── logo/           # SAR logo (SVG + PNG)
├── index.html          # Home/hero + categories + about
├── register.html       # Registration form with validation
├── booking.html        # Booking UI + resources
├── history.html        # Event gallery + modal details
├── calendar.html       # JS calendar (month/week/year)
├── contact.html        # Contact form + map + details
├── UML_Diagrams/       # Use case, activity, sequence, class diagrams (SVG+PNG)
└── REPORT/             # Printable report (Markdown)
```

## Pages
- `index.html`: Animated hero, featured highlights, activity category cards, about section, footer with social/contact.
- `register.html`: Validated form (name, student ID, email, password, college, activity type) with inline errors and success message.
- `booking.html`: Booking form, resource highlights, CTA chips, confirmation alert.
- `history.html`: Responsive gallery with modal popups for event details.
- `calendar.html`: Switch between month/week/year; events rendered in-grid; navigation between months.
- `contact.html`: Contact form with JS validation, university details, embedded map.
- Extras on Home: metrics counters, lifecycle timeline, testimonials, FAQ, newsletter CTA, partner badges.
- `resources.html`: Bookable spaces and equipment catalog with notes.
- `clubs.html`: Active clubs/committees showcase with meeting info.
- `dashboard.html`: Stats, upcoming bookings table, recent activity timeline.
- `chat.html`: Mock chat UI with contacts list and conversation panel.
- `assistant.html`: AI helper mock with prompts and responses.
- `models.html`: Model/report catalog cards.
- `settings.html`: Profile, notifications, and appearance placeholders.

### New UX touch
- Global loader overlay + smooth page transitions; scroll reveals; counters; parallax.

## Running
1. Open `index.html` in a browser (or serve locally with any static server, e.g. `npx serve`).
2. Navigate via the top navbar to explore registration, booking, history, calendar, and contact pages.

## Notes
- All data is mock/demo for front-end showcase.
- Assets are local; fonts load from Google Fonts CDN.
- Calendar events are sample entries defined in `assets/js/calendar.js`.

