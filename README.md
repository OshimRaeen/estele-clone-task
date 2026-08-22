# Headless E-Commerce Platform — Estele Clone

A full-stack, **headless e-commerce web application** built as a technical selection task.

The project demonstrates a **decoupled architecture**, separating the backend CMS/API layer from the reactive frontend user interface.

It is designed to be **lightweight, performant, and easy to run locally**, with minimal database configuration required.

---

## 🏗️ Architecture Overview

The application follows a **headless architecture**, where the frontend and backend operate independently and communicate through REST APIs.

### Backend — Laravel 11

The Laravel backend acts as:

* A RESTful API
* A Headless CMS
* A product management system
* An admin interface powered by FilamentPHP

Product data is stored using **SQLite**, making the project easy to set up and evaluate locally.

### Frontend — React + Vite

The frontend is a React Single Page Application (SPA) that consumes the Laravel REST API.

The interface is inspired by the design and shopping experience of **Estele.co**, while using a custom implementation.

### State Management

For this MVP, **Cart** and **Wishlist** states are managed globally using the React Context API.

The state is persisted using `localStorage`, allowing:

* Cart items to survive page refreshes
* Wishlist items to remain saved
* Fast client-side interaction
* Database-free cart/wishlist management during evaluation

---

## 💻 Tech Stack

### Backend API & Admin Panel

* PHP
* Laravel 11
* SQLite
* FilamentPHP
* REST API

### Frontend UI

* React.js
* Vite
* Tailwind CSS
* Axios
* React Context API
* LocalStorage

---

## ✨ Key Features

### REST API

Laravel API routes dynamically serve product data from the database to the React frontend.

### Filament Admin Dashboard

FilamentPHP provides an admin interface for managing the product catalog.

Administrators can perform CRUD operations:

* Create products
* View products
* Update products
* Delete products

### Responsive Storefront

A responsive, grid-based storefront built using React and Tailwind CSS.

The UI is designed to work across:

* Desktop
* Tablet
* Mobile

### Slide-Out Cart

A responsive slide-out cart drawer allows users to:

* Add products
* View selected products
* Remove products
* View the total price

The drawer includes smooth animations and a frosted-glass backdrop effect.

### Wishlist

Users can add or remove products from their wishlist through a dedicated slide-out interface.

### Persistent Global State

A custom React Context provider manages cart and wishlist state across the application.

Cart and wishlist data are persisted using `localStorage`, ensuring that the user's selections remain available after page reloads.

### Real-Time Cart Total

Cart totals are calculated dynamically and displayed in Indian Rupees (`₹`).

---

# 🚀 Running the Project Locally

Because the application uses a decoupled architecture, the **backend and frontend must be run separately**.

You will need **two terminal windows**.

---

## Prerequisites

Make sure the following are installed on your machine:

* PHP
* Composer
* Node.js
* npm
* SQLite
* Git

---

# 1. Backend Setup — Laravel API

Navigate to the backend directory:

```bash
cd backend
```

### Install PHP Dependencies

```bash
composer install
```

### Create the Environment File

```bash
cp .env.example .env
```

### Generate the Laravel Application Key

```bash
php artisan key:generate
```

### Configure SQLite

Make sure your `.env` contains:

```env
DB_CONNECTION=sqlite
```

If the SQLite database file does not already exist, create it:

**macOS / Linux**

```bash
touch database/database.sqlite
```

**Windows PowerShell**

```powershell
New-Item database/database.sqlite -ItemType File
```

### Run Database Migrations

```bash
php artisan migrate
```

This will create the required database tables.

### Create a Filament Admin User

```bash
php artisan make:filament-user
```

Enter the requested:

* Name
* Email
* Password

These credentials will be used to access the admin dashboard.

### Start the Laravel Development Server

```bash
php artisan serve
```

The backend API should now be available at:

```text
http://localhost:8000
```

The Filament Admin Panel can be accessed at:

```text
http://localhost:8000/admin
```

Use the admin dashboard to create and manage test products.

---

# 2. Frontend Setup — React UI

Open a **new terminal window**.

Navigate to the frontend directory:

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start the Vite Development Server

```bash
npm run dev
```

The frontend should now be available at:

```text
http://localhost:5173
```

---

## 🔄 Application Flow

The basic data flow of the application is:

```text
┌─────────────────────┐
│   Filament Admin    │
│   Product CRUD      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     Laravel 11      │
│                     │
│   SQLite Database   │
│         +           │
│      REST API       │
└──────────┬──────────┘
           │
           │ JSON / HTTP
           ▼
┌─────────────────────┐
│    React + Vite     │
│                     │
│   Product Catalog   │
│   Cart / Wishlist   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    React Context    │
│         +           │
│    localStorage     │
└─────────────────────┘
```

---

## 📂 Project Structure

```text
project-root/
│
├── backend/
│   ├── app/
│   ├── database/
│   │   └── database.sqlite
│   ├── routes/
│   │   ├── api.php
│   │   └── web.php
│   ├── .env.example
│   ├── artisan
│   └── composer.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

> The exact directory structure may vary depending on the final implementation.

---

## 🧪 Testing the Application

After starting both servers:

1. Open the Filament admin dashboard:

```text
http://localhost:8000/admin
```

2. Log in using the Filament admin account created during setup.

3. Add a few products through the admin dashboard.

4. Open the React storefront:

```text
http://localhost:5173
```

5. Verify that products created through Filament appear on the storefront.

6. Test adding products to the **Cart**.

7. Test adding products to the **Wishlist**.

8. Refresh the browser and verify that cart and wishlist items remain persisted.

---

## 🎯 Technical Decisions

### Why Headless Architecture?

Separating the frontend and backend provides:

* Clear separation of concerns
* Independent frontend/backend development
* Easier API testing
* Greater frontend flexibility
* Better scalability for future clients such as mobile applications

### Why SQLite?

SQLite was selected specifically to simplify local evaluation.

It provides:

* No external database server requirement
* Minimal configuration
* Fast local setup
* Easy project portability

### Why React Context API?

For the scope of this MVP, Redux or another external state-management library would introduce unnecessary complexity.

React Context provides sufficient global state management for:

* Cart
* Wishlist
* Cart totals

### Why LocalStorage?

Cart and wishlist state does not require server-side persistence for the current MVP.

`localStorage` provides simple persistence while keeping the evaluation environment lightweight.

---

## 🔮 Possible Future Improvements

The architecture can be extended with:

* User authentication
* Server-side cart persistence
* Server-side wishlist persistence
* Product categories
* Product search and filtering
* Product variants
* Inventory management
* Checkout flow
* Payment gateway integration
* Order management
* Customer profiles
* Product reviews
* Pagination
* API authentication
* Automated API and frontend testing
* Docker-based deployment

---

## 📝 Notes

This project was developed as a technical selection task with an emphasis on:

* Clean architecture
* Separation of concerns
* API-driven development
* Responsive UI
* Simple local setup
* Maintainable code

The primary goal is to demonstrate how a modern frontend application can consume and interact with a standalone Laravel backend while keeping the system straightforward to run and evaluate.
