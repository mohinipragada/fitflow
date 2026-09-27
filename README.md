# FitFlow – Fitness & Workout App

A full-stack fitness tracking app built as a student project with **React**, **Node.js/Express** and **MongoDB**.

> Status: **Step 2 of 14 done** (project structure + all React pages using sample data). This README grows as each step is finished.

## 1. Project introduction

FitFlow lets a user create an account, log in, track daily steps, calories and active minutes, follow workouts exercise by exercise, see weekly progress on a chart, and manage their profile and settings.

## 2. Features

- Register and log in with email and password (passwords hashed with bcrypt, sessions with JWT)
- Home dashboard: steps ring, calories, active minutes, next workout
- Workouts by category (All, Strength, Cardio, Mobility) with exercise checklists
- Weekly progress chart built from real database data
- Editable profile (height, weight, age) and settings (step goal, units, notifications)

## 3. Technologies used

| Part | Technology | What it does |
| --- | --- | --- |
| Frontend | React + Vite | Builds the screens the user sees and clicks |
| Routing | React Router | Switches pages (/home, /profile…) without reloading |
| Backend | Node.js + Express | Runs the server and the REST API |
| Database | MongoDB + Mongoose | Stores users, activity and workout history |
| Auth | bcryptjs + JSON Web Token | Hashes passwords and proves who is logged in |

> We use `bcryptjs`, the pure-JavaScript version of bcrypt. It works the same way but installs on Windows without extra build tools.

## 4. Folder structure

```
fitflow/
├── client/                  React frontend
│   ├── public/              Static files (favicon)
│   ├── src/
│   │   ├── components/      Reusable UI pieces (cards, progress ring, bottom nav)
│   │   ├── pages/           One file per screen (Login, Home, Workouts…)
│   │   ├── layouts/         Shared page frame (content + bottom navigation)
│   │   ├── services/        Functions that call the backend API
│   │   ├── context/         Global state, e.g. who is logged in
│   │   ├── hooks/           Custom React hooks
│   │   ├── assets/          Images and icons
│   │   ├── App.jsx          Main component, holds the routes
│   │   ├── main.jsx         Entry point that starts React
│   │   └── index.css        Global styles and design colors
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                  Express backend
│   ├── config/              Database connection
│   ├── controllers/         The logic for each API route
│   ├── models/              Mongoose schemas (User, Workout, Activity…)
│   ├── routes/              Maps URLs to controllers
│   ├── middleware/          JWT check that protects private routes
│   ├── server.js            Starts the Express server
│   └── package.json
├── .env.example             Template for secret settings
├── .gitignore
└── README.md
```

## 5. Install dependencies

You need [Node.js](https://nodejs.org) (version 20 or newer).

```bash
cd server
npm install

cd ../client
npm install
```

## 6. Configure MongoDB

_Filled in at Step 4._

## 7. Create the .env file

Copy `.env.example` to a new file named `.env` in the `fitflow/` folder and fill in the values. The `.env` file is ignored by git so your secrets are never uploaded.

## 8. Start the backend

```bash
cd server
npm run dev
```

Open http://localhost:5000/api/health — you should see `{"status":"ok"}`.

## 9. Start the frontend

In a second terminal:

```bash
cd client
npm run dev
```

Open http://localhost:5173.

## 10. API explanation

_Filled in at Steps 6–11._

## 11. How authentication works

_Filled in at Step 6._

## 12. Future improvements

_Filled in at the end._
