# Blog Platform

This is a full-stack blog platform built with React for the frontend and Hono JS with Cloudflare Workers for the backend. It includes functionalities for creating, editing, and deleting blog posts, as well as user authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (sign up, sign in)
- Create, edit, and delete blog posts
- View all blogs and individual blog pages
- Responsive design
- Custom hooks for form management and data fetching
- Error handling and notifications

## Technologies Used

### Frontend

- React
- React Router
- React Hook Form
- Axios
- Tailwind CSS
- Toastify for notifications

### Backend

- Hono JS
- Cloudflare Workers
- Prisma (with Accelerate extension)
- SQLite (or other databases supported by Prisma)

## Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher) or Yarn
- Cloudflare account for deploying workers

## Getting Started

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/souvikiiest/Blogify.git
   cd blogify

   ```

2. **Install dependencies:**
   cd backend
   npm install
3. **Set up environment variables:**
   Create a .env file in the backend directory with the following content:
   DATABASE_URL="sqlite:./dev.db"

4. **Run database migration**

````bash
  npx prisma migrate dev --name init

5. **Start the backend serve**
``bash
  npm run dev

### Frontend Setup

```bash
cd frontend
npm i
npm run dev


````
