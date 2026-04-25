# TaskFlow — Full-Stack Task Manager

A full-stack task management app built with the MERN stack (MongoDB, Express.js, React, Node.js). Features JWT authentication, full CRUD operations, filtering, priority levels, due dates, and a progress dashboard.

**Live demo:** [your-app.vercel.app](https://your-app.vercel.app) <!-- update after deploy -->

![TaskFlow Screenshot](./screenshot.png) <!-- add a screenshot after running -->

## Tech stack

**Frontend:** React 18, React Router v6, Tailwind CSS, Axios, Vite  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs  
**Deployed on:** Vercel (frontend) + Railway (backend) + MongoDB Atlas

## Features

- JWT-based authentication (register, login, protected routes)
- Create, edit, delete, and complete tasks
- Filter by status (to do / in progress / done) and priority (low / medium / high)
- Due date tracking with overdue indicators
- Progress bar dashboard with task stats
- Fully responsive UI

## Getting started locally

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free) or local MongoDB

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

### 2. Set up the backend
```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and fill in:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=any_long_random_string
CLIENT_URL=http://localhost:5173
```

### 3. Set up the frontend
```bash
cd ../frontend
npm install
```

### 4. Run both servers

In one terminal:
```bash
cd backend && npm run dev
```

In another terminal:
```bash
cd frontend && npm run dev
```

App runs at `http://localhost:5173`

## API endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login | No |
| GET | /api/auth/me | Get current user | Yes |
| GET | /api/tasks | Get all tasks | Yes |
| POST | /api/tasks | Create task | Yes |
| PUT | /api/tasks/:id | Update task | Yes |
| DELETE | /api/tasks/:id | Delete task | Yes |
| GET | /api/tasks/stats/summary | Get task stats | Yes |

## Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import repo at vercel.com
3. Set root directory to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend.railway.app`

### Backend → Railway
1. Go to railway.app → New Project → Deploy from GitHub
2. Set root directory to `backend`
3. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`
4. Railway auto-detects Node.js and deploys

## Project structure

```
taskflow/
├── backend/
│   ├── config/db.js          # MongoDB connection
│   ├── middleware/auth.js     # JWT middleware
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   ├── auth.js            # Auth routes
│   │   └── tasks.js           # Task CRUD routes
│   └── server.js              # Express app entry point
└── frontend/
    └── src/
        ├── components/
        │   ├── layout/Navbar.jsx
        │   └── tasks/
        │       ├── TaskCard.jsx
        │       ├── TaskModal.jsx
        │       └── StatsBar.jsx
        ├── context/AuthContext.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── Dashboard.jsx
        ├── utils/api.js
        └── App.jsx
```

## Author

**Saim Bin Zahid** — Full-Stack Engineer  
[LinkedIn](https://linkedin.com/in/saim-bin-zahid) · [GitHub](https://github.com/yourusername)
