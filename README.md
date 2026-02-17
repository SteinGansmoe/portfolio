# SteinGansmoe.dev – Portfolio Website

A modern developer portfolio built with React, TypeScript and Tailwind CSS.  
The site showcases selected projects, detailed case studies, and includes an authenticated admin panel for managing content dynamically via Supabase.

Live site: [https://steingansmoe.vercel.app](#)

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Tailwind Typography plugin
- React Router

### Backend / Services
- Supabase (Authentication, Database, Storage, Row Level Security)
- Supabase Storage for project image uploads

### Tooling
- Prettier (with Tailwind plugin)
- ESLint
- Vercel (deployment)

---

## ✨ Features

- Fully responsive design
- Image-based project gallery
- Markdown-powered case studies
- Admin dashboard for:
  - Creating projects
  - Editing projects
  - Deleting projects
  - Uploading and managing images
- Role-based access control (admin-only dashboard)
- Live authentication state handling (no page refresh required)
- Clean, scalable component architecture

---

## 🔐 Authentication & Authorization

Authentication is handled via Supabase.

- Admin users are stored in a dedicated `admins` table
- Role-based access is enforced via:
  - Route guards (`RequireAdmin`, `RequireGuest`)
  - Supabase Row Level Security (RLS) policies
- Navbar updates reactively using Supabase auth listeners

---

## 🖼 Image Handling

Project images are uploaded to Supabase Storage.

- Images are previewed before upload
- Existing images can be replaced or removed
- Stored image URLs are persisted in the database
- Recommended format: 1600×900 (16:9)

---

## 📝 Markdown Case Studies

Project descriptions are written in Markdown and rendered using:

- `react-markdown`
- Tailwind Typography plugin

This allows structured, readable case studies without requiring a rich text editor.

---

## 🏗 Project Structure
```
src/
features/
auth/
projects/
pages/
components/
lib/
```


The project follows a feature-based folder structure to keep logic modular and scalable.

---

## ⚙️ Local Development

### 1. Clone repository

```git clone https://github.com/SteinGansmoe/portfolio.git```


### 2. Install dependencies

```npm install```


### 3. Setup environment variables

Create a `.env` file in the root:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Start development server

```npm run dev```


---

## 🚀 Deployment

The project is deployed on Vercel.

Environment variables must also be configured in the Vercel dashboard.

---

## 📌 Purpose of This Project

This portfolio is designed to:

- Showcase my technical skills
- Demonstrate architectural thinking
- Present real-world React + TypeScript development
- Provide a scalable, production-style content system

It reflects how I approach frontend engineering:
clean structure, thoughtful UX, and maintainable systems.
