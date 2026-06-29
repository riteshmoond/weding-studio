# Studiopalsana Frontend

Ye folder Wedding Studio Booking System ka React frontend hai. Backend API `../Studiopalsanabackend` folder me hai.

## Tech Stack

- React 19
- Vite 7
- React Router DOM 7
- Tailwind CSS 4
- Lucide React icons

## Setup

```bash
cd Studiopalsana
npm install
```

Local backend ke liye `.env` file banao:

```env
VITE_API_URL=http://localhost:5000/api
```

Dev server:

```bash
npm run dev
```

Default local URL:

```text
http://localhost:5173
```

Production build:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

## Pages

- `/` - Home
- `/about` - About
- `/services` - Services
- `/gallery` - Gallery
- `/packages` - Packages
- `/booking` - Booking
- `/reviews` - Reviews
- `/contact` - Contact
- `/account` - Customer account
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/bookings` - Bookings management
- `/admin/messages` - Contact messages
- `/admin/settings` - Studio settings
- `/admin/gallery` - Gallery management
- `/admin/packages` - Packages management
- `/admin/team` - Team management
- `/admin/reviews` - Review moderation

## Important Files

- `src/App.jsx` - routes and admin protection
- `src/main.jsx` - React entry point
- `src/lib/api.js` - backend API client, token/session helpers
- `src/lib/studioData.js` - studio settings helpers
- `src/context/AuthContext.jsx` - auth provider
- `src/context/auth-context.js` - auth hook/context export
- `src/components/Header.jsx` - public navigation
- `src/components/Footer.jsx` - public footer
- `src/components/BookingForm.jsx` - booking form
- `src/components/AdminSidebar.jsx` - admin sidebar
- `src/components/AdminTopbar.jsx` - admin topbar

## API Connection

Frontend `src/lib/api.js` me `VITE_API_URL` read karta hai.

Local:

```env
VITE_API_URL=http://localhost:5000/api
```

Production:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

Env change karne ke baad Vite server restart karna zaroori hai.

## Auth

- Login/register ke baad JWT token `localStorage` me `royalStudioToken` key ke under save hota hai
- Current user `royalStudioUser` key me save hota hai
- Protected admin pages ke liye `user.role === "admin"` required hai

## Deployment on Vercel

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Environment variable:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

`vercel.json` me SPA rewrite configured hai, isliye direct route refresh work karega.
