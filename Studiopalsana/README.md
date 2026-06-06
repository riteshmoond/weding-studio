
# Wedding Studio Booking System

Yeh project ek full-stack Wedding Studio Booking System hai, jisme saare important features working hain:

## Features

- **Event Booking**: User apni shaadi ya event ki booking kar sakta hai (date, name, phone ke sath)
- **Calendar Booking**: Date picker se booking date select hoti hai
- **Gallery**: Wedding photos ka gallery (admin upload, user view)
- **Package Selection**: Alag-alag wedding packages dikhte hain
- **Admin Panel**: Admin login, bookings, gallery, packages, messages manage kar sakta hai
- **Customer Reviews**: User apna review/feedback de sakta hai, sabke reviews testimonials page pe dikhte hain
- **WhatsApp Integration**: User direct WhatsApp pe booking message bhej sakta hai (pre-filled details ke sath)

---

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, MongoDB (Mongoose)

---

## Setup & Run (Hinglish)

### 1. Backend (Studiopalsanabackend)

1. `cd Studiopalsanabackend`
2. `npm install`
3. `.env` file banao (MongoDB URI, etc.)
4. `npm run dev` se backend server chalao (default: http://localhost:5000)

### 2. Frontend (Studiopalsana)

1. `cd Studiopalsana`
2. `npm install`
3. `npm run dev` se frontend chalao (default: http://localhost:3000)

---

## Usage Guide

- **Booking**: Home page pe booking form bharo, date select karo, Book Now dabao ya WhatsApp se book karo
- **Gallery**: Gallery page pe photos dekho
- **Packages**: Packages page pe wedding packages dekho
- **Admin Panel**: /admin se login karke bookings, gallery, packages, messages manage karo
- **Customer Reviews**: Testimonials page pe review submit karo aur sabke reviews dekho
- **WhatsApp**: Booking form me WhatsApp button se direct WhatsApp pe message bhejo

---

## Important Files/Folders

- `src/components/BookingForm.jsx` – Booking form + WhatsApp integration
- `src/components/ReviewForm.jsx` – Review submit form
- `src/components/TestimonialsList.jsx` – Reviews list
- `src/pages/Testimonials.jsx` – Testimonials page
- `src/lib/api.js` – Booking API helper
- `src/lib/reviewApi.js` – Review API helper

---

## Customization

- WhatsApp number change karna ho toh `BookingForm.jsx` me number update karo
- Admin credentials, MongoDB URI, etc. `.env` file me set karo

---

## Credits

Banaya gaya by your team, with ❤️ using React, Node.js, MongoDB.
