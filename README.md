# Studiopalsana - Wedding Studio Booking System

Studiopalsana ek full-stack wedding studio website hai. Isme public website, customer account, online booking, gallery, packages, reviews, contact messages aur admin dashboard included hai.

Project ke 2 main parts hain:

- `Studiopalsana` - React + Vite frontend
- `Studiopalsanabackend` - Node.js + Express + MongoDB backend API

## Main Features

- Public pages: Home, About, Services, Gallery, Packages, Booking, Reviews, Contact
- Customer auth: register, login, session restore, account page
- Booking system: customer event booking create kar sakta hai; admin status, date, venue, package aur quote update kar sakta hai
- Admin panel: dashboard, bookings, messages, settings, gallery, packages, team aur reviews manage karne ke pages
- Role-based access: `admin` aur `customer` roles
- Gallery upload: images/videos upload support; Cloudinary available ho to cloud upload, otherwise local disk upload
- Reviews moderation: public review submit hota hai, admin approve/reject kar sakta hai
- Studio settings: studio name, contact details, social links aur hero image backend se manage hote hain
- Team management: team members add/update/delete
- Deployment config: frontend ke liye Vercel rewrite config, backend ke liye Render config

## Tech Stack

### Frontend

- React 19
- Vite 7
- React Router DOM 7
- Tailwind CSS 4
- Lucide React icons
- Radix Slot, class-variance-authority, clsx, tailwind-merge

### Backend

- Node.js 20.19+
- Express 5
- MongoDB + Mongoose
- JWT authentication
- bcryptjs password hashing
- multer file upload
- Cloudinary optional media storage
- cookie-parser, cors, dotenv

## Folder Structure

```text
Main/
  package.json
  render.yaml
  vercel.json
  Studiopalsana/
    package.json
    src/
      App.jsx
      main.jsx
      components/
      context/
      lib/
      pages/
      assets/
  Studiopalsanabackend/
    package.json
    index.js
    .env.example
    src/
      config/
      controllers/
      Middleware/
      Models/
      Routes/
      utils/
```

## Quick Start

### Requirements

- Node.js `>=20.19.0`
- npm
- MongoDB local ya MongoDB Atlas

### Install Dependencies

Root workspace se:

```bash
cd Main
npm install
```

Agar workspace install issue aaye to dono folders me separately install kar sakte hain:

```bash
cd Studiopalsanabackend
npm install

cd ../Studiopalsana
npm install
```

### Backend Environment

`Studiopalsanabackend/.env.example` ko copy karke `.env` banao:

```bash
cd Studiopalsanabackend
copy .env.example .env
```

Example:

```env
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/royal-wedding-studio
JWT_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=http://localhost:5173
ADMIN_SETUP_KEY=one-time-admin-setup-key
ADMIN_NAME=Royal Studio Admin
ADMIN_EMAIL=admin@royalweddingstudio.in
ADMIN_PASSWORD=replace-with-a-strong-password
```

Cloudinary optional hai. Agar ye variables set hain to gallery uploads Cloudinary me jayenge:

```env
CLOUD_NAME=
CLOUD_KEY=
CLOUD_SECRET=
```

Alternative Cloudinary names bhi supported hain:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Frontend Environment

Frontend me API URL set karne ke liye `Studiopalsana/.env` banao:

```env
VITE_API_URL=http://localhost:5000/api
```

Agar env missing hai to frontend default production API use karta hai:

```text
https://weding-studio.onrender.com/api
```

### Run Backend

```bash
cd Studiopalsanabackend
npm run dev
```

Backend default:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/api/health
```

### Run Frontend

```bash
cd Studiopalsana
npm run dev
```

Frontend default:

```text
http://localhost:5173
```

## Root Scripts

`Main/package.json` workspace scripts:

```bash
npm start
```

Backend start karta hai.

```bash
npm run build
```

Frontend production build banata hai.

## Frontend Details

### Routes

- `/` - Home
- `/about` - About studio
- `/services` - Services
- `/gallery` - Gallery
- `/packages` - Packages
- `/booking` - Booking form
- `/reviews` - Reviews/testimonials
- `/contact` - Contact form
- `/account` - Customer account
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/bookings` - Booking management
- `/admin/messages` - Contact messages
- `/admin/settings` - Studio settings
- `/admin/gallery` - Gallery management
- `/admin/packages` - Package management
- `/admin/team` - Team management
- `/admin/reviews` - Review moderation

### Important Frontend Files

- `src/App.jsx` - app routes and admin route guard
- `src/lib/api.js` - API helper, token storage, session helpers
- `src/lib/studioData.js` - frontend studio data/settings helpers
- `src/context/AuthContext.jsx` and `src/context/auth-context.js` - auth context
- `src/components/Header.jsx` - public header/navigation
- `src/components/Footer.jsx` - public footer
- `src/components/BookingForm.jsx` - booking form UI
- `src/components/AdminSidebar.jsx` and `src/components/AdminTopbar.jsx` - admin layout

## Backend Details

Backend entry file:

```text
Studiopalsanabackend/index.js
```

It does:

- Loads `.env`
- Connects MongoDB
- Seeds initial admin if `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set
- Enables CORS for `FRONTEND_URL`
- Serves local uploads from `/upload`
- Registers all `/api/*` routes
- Starts Express server

### API Routes

Base URL:

```text
http://localhost:5000/api
```

Auth:

- `POST /auth/register` - customer registration
- `POST /auth/login` - customer/admin login
- `GET /auth/me` - current user session
- `POST /auth/setup-admin` - first admin creation using `x-setup-key`

Bookings:

- `POST /bookings` - create booking, customer only
- `GET /bookings` - admin gets all bookings, customer gets own bookings
- `GET /bookings/stats` - admin dashboard stats
- `PATCH /bookings/:id` - admin updates booking
- `DELETE /bookings/:id` - admin deletes booking

Gallery:

- `GET /gallery` - public gallery list
- `POST /gallery/upload` - admin upload image/video with `image` form field
- `DELETE /gallery/:id` - admin delete media

Messages:

- `POST /messages` - customer sends contact message
- `GET /messages` - admin views messages
- `DELETE /messages/:id` - admin deletes message

Packages:

- `GET /packages` - public active packages
- `POST /packages` - admin creates package
- `PATCH /packages/:id` - admin updates package
- `DELETE /packages/:id` - admin deletes package

Reviews:

- `GET /reviews` - public approved reviews
- `POST /reviews` - submit review for approval
- `GET /reviews/admin` - admin gets all reviews
- `PATCH /reviews/:id` - admin changes review status
- `DELETE /reviews/:id` - admin deletes review

Team:

- `GET /team` - public team list
- `POST /team` - admin creates team member
- `PATCH /team/:id` - admin updates team member
- `DELETE /team/:id` - admin deletes team member

Settings:

- `GET /settings` - public studio settings
- `PUT /settings` - admin updates studio settings

Health:

- `GET /health` - backend health check

## Database Models

- `User` - name, email, phone, password, role
- `Booking` - customer/event details, status, quoted amount, customer reference
- `Gallery` - title, category, album, media URL, public ID, media type
- `Package` - title, price, description, features, featured, active
- `Review` - name, email, rating, comment, status
- `Message` - name, email, phone, message, createdAt
- `StudioSettings` - studio contact, hero image and social links
- `TeamMember` - name, role, photo, bio, order

## Authentication Flow

- Login/register response me JWT token milta hai
- Frontend token ko `localStorage` me `royalStudioToken` key ke under store karta hai
- API helper har protected request me `Authorization: Bearer <token>` send karta hai
- Admin pages `user.role === "admin"` check karte hain
- Backend middleware protected routes me JWT validate karta hai

## Admin Account

Admin account 2 tarike se ban sakta hai:

1. Automatic seed: backend start hone par agar `.env` me `ADMIN_EMAIL` aur `ADMIN_PASSWORD` set hain, aur same email ka user exist nahi karta, to admin user create ho jata hai.
2. Setup endpoint: `POST /api/auth/setup-admin` with `x-setup-key: <ADMIN_SETUP_KEY>`. Ye tab kaam karega jab database me pehle se admin role wala user exist nahi hai.

## File Upload Behavior

- Allowed uploads: image aur video
- Max file size: 50 MB
- Form field name: `image`
- Cloudinary env set hain to upload Cloudinary folder `wedding-gallery` me hota hai
- Cloudinary env missing ho to local `Studiopalsanabackend/upload` folder use hota hai
- Local uploaded files `/upload/<filename>` URL se serve hote hain

## Deployment

### Frontend on Vercel

Frontend folder:

```text
Studiopalsana
```

Build command:

```bash
npm run build
```

Output folder:

```text
dist
```

Set environment variable:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

`vercel.json` SPA rewrites configured hain, isliye direct route refresh work karega.

### Backend on Render

`render.yaml` backend service define karta hai:

- Root directory: `Studiopalsanabackend`
- Build command: `npm ci`
- Start command: `npm start`
- Health check: `/api/health`

Required Render env vars:

```env
NODE_ENV=production
MONGO_URL=mongodb+srv://...
JWT_SECRET=<generated-or-custom-secret>
FRONTEND_URL=https://your-frontend-domain.vercel.app
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<strong-password>
```

Optional:

```env
ADMIN_NAME=Studio Admin
ADMIN_SETUP_KEY=<setup-key>
CLOUD_NAME=
CLOUD_KEY=
CLOUD_SECRET=
```

Production me `MONGO_URL` localhost nahi hona chahiye. Render ke liye MongoDB Atlas URI use karo.

## Common Issues

### CORS error

Backend `.env` ya Render env me `FRONTEND_URL` exactly frontend domain hona chahiye.

### Frontend API wrong backend par call kar raha hai

Frontend `.env` me `VITE_API_URL=http://localhost:5000/api` set karo. Change ke baad Vite dev server restart karo.

### MongoDB connection failed

- `MONGO_URL` valid `mongodb://` ya `mongodb+srv://` URI hona chahiye
- Atlas me database user/password correct hon
- Atlas Network Access me Render IP allow ho, ya testing ke liye `0.0.0.0/0`
- Production me localhost URI mat use karo

### Admin login nahi ho raha

- `ADMIN_PASSWORD` minimum 8 characters hona chahiye for seed
- Backend start logs check karo: `Initial admin account created.`
- Agar user already exist hai to seed duplicate create nahi karega

### Gallery upload fail

- File image/video honi chahiye
- Size 50 MB se kam ho
- Cloudinary env complete ho agar production me cloud upload chahiye
- Local upload production hosting me persistent nahi hota; production ke liye Cloudinary recommended hai

## Useful Commands

Frontend:

```bash
cd Studiopalsana
npm run dev
npm run build
npm run preview
npm run lint
```

Backend:

```bash
cd Studiopalsanabackend
npm run dev
npm start
```

Root workspace:

```bash
cd Main
npm start
npm run build
```

## Notes

- Frontend routes React Router se manage hote hain
- Admin routes frontend guard ke saath protected hain, aur backend role middleware se bhi protected hain
- Reviews public submit ho sakte hain, lekin public list me sirf `Approved` reviews dikhte hain
- Packages public list me sirf `active: true` packages return hote hain
- Booking create karne ke liye customer login required hai
