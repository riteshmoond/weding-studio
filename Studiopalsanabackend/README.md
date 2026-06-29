# Studiopalsana Backend

Ye folder Wedding Studio Booking System ka Node.js backend API hai. Frontend `../Studiopalsana` folder me hai.

## Tech Stack

- Node.js `>=20.19.0`
- Express 5
- MongoDB + Mongoose
- JWT authentication
- bcryptjs
- multer
- Cloudinary optional uploads
- cors, cookie-parser, dotenv

## Setup

```bash
cd Studiopalsanabackend
npm install
```

`.env.example` ko copy karke `.env` banao:

```bash
copy .env.example .env
```

Minimum local env:

```env
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/royal-wedding-studio
JWT_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=http://localhost:5173
ADMIN_NAME=Royal Studio Admin
ADMIN_EMAIL=admin@royalweddingstudio.in
ADMIN_PASSWORD=replace-with-a-strong-password
ADMIN_SETUP_KEY=one-time-admin-setup-key
```

Run dev server:

```bash
npm run dev
```

Run production server:

```bash
npm start
```

Default URL:

```text
http://localhost:5000
```

Health check:

```text
GET /api/health
```

## Environment Variables

- `PORT` - backend port, default `5000`
- `MONGO_URL` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `FRONTEND_URL` - allowed frontend origin for CORS
- `ADMIN_NAME` - initial admin name
- `ADMIN_EMAIL` - initial admin email
- `ADMIN_PASSWORD` - initial admin password, minimum 8 characters
- `ADMIN_SETUP_KEY` - one-time setup key for `/api/auth/setup-admin`
- `CLOUD_NAME` / `CLOUD_KEY` / `CLOUD_SECRET` - optional Cloudinary credentials
- `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` - alternate Cloudinary variable names

## Project Structure

```text
Studiopalsanabackend/
  index.js
  .env.example
  src/
    config/
      db.js
      cloudinary.js
    controllers/
    Middleware/
    Models/
    Routes/
    utils/
      seedAdmin.js
```

## API Summary

Base path:

```text
/api
```

### Auth

- `POST /auth/register` - customer registration
- `POST /auth/login` - user login
- `GET /auth/me` - current user
- `POST /auth/setup-admin` - first admin creation, needs `x-setup-key`

### Admin

- `POST /admin/login` - legacy admin login
- `POST /admin/logout` - legacy admin logout

### Bookings

- `POST /bookings` - customer creates booking
- `GET /bookings` - admin sees all, customer sees own
- `GET /bookings/stats` - admin stats
- `PATCH /bookings/:id` - admin updates booking
- `DELETE /bookings/:id` - admin deletes booking

### Gallery

- `GET /gallery` - public list
- `POST /gallery/upload` - admin upload image/video, form field `image`
- `DELETE /gallery/:id` - admin delete

### Messages

- `POST /messages` - customer sends message
- `GET /messages` - admin list
- `DELETE /messages/:id` - admin delete

### Packages

- `GET /packages` - public active packages
- `POST /packages` - admin create
- `PATCH /packages/:id` - admin update
- `DELETE /packages/:id` - admin delete

### Reviews

- `GET /reviews` - public approved reviews
- `POST /reviews` - submit review
- `GET /reviews/admin` - admin all reviews
- `PATCH /reviews/:id` - admin update status
- `DELETE /reviews/:id` - admin delete

### Team

- `GET /team` - public team
- `POST /team` - admin create
- `PATCH /team/:id` - admin update
- `DELETE /team/:id` - admin delete

### Settings

- `GET /settings` - public settings
- `PUT /settings` - admin update settings

## Auth and Roles

- JWT token `Authorization: Bearer <token>` header me send hota hai
- `adminOnly` middleware admin routes protect karta hai
- `customerOnly` middleware customer booking/message routes protect karta hai
- Customer registration ka role default `customer` hota hai
- Admin seed `.env` ke `ADMIN_EMAIL` aur `ADMIN_PASSWORD` se hota hai

## Models

- `User` - name, email, phone, password, role
- `Booking` - event/customer details, status, quote, customer reference
- `Gallery` - title, category, album, media URL, media type
- `Package` - title, price, description, features, featured, active
- `Review` - name, email, rating, comment, status
- `Message` - contact form message
- `StudioSettings` - studio contact/social/hero settings
- `TeamMember` - team member details

## Uploads

- Allowed file types: image and video
- Max file size: 50 MB
- Upload field: `image`
- Cloudinary credentials present hon to Cloudinary storage use hota hai
- Cloudinary missing ho to local `upload` folder use hota hai
- Local files `/upload/<filename>` path se serve hote hain

## Deployment on Render

`../render.yaml` me Render service configured hai.

Recommended Render settings:

- Root directory: `Studiopalsanabackend`
- Build command: `npm ci`
- Start command: `npm start`
- Health check path: `/api/health`

Required env:

```env
NODE_ENV=production
MONGO_URL=mongodb+srv://...
JWT_SECRET=<strong-secret>
FRONTEND_URL=https://your-frontend-domain.vercel.app
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<strong-password>
```

Production me `MONGO_URL` localhost nahi hona chahiye. MongoDB Atlas URI use karo.

## Common Problems

- CORS error: `FRONTEND_URL` frontend domain ke exactly same rakho
- MongoDB fail: `MONGO_URL` valid URI ho aur Atlas Network Access allow ho
- Admin seed skip: `ADMIN_PASSWORD` 8 characters se kam nahi hona chahiye
- Gallery upload fail: Cloudinary env complete karo ya local upload folder writable rakho
