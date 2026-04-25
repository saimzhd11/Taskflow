# TaskFlow — Full-Stack Task Manager

A full-stack task management app built with the MERN stack (MongoDB, Express.js, React, Node.js). Features JWT authentication, full CRUD operations, filtering, priority levels, due dates, and a progress dashboard.

**Live demo:** [your-app.vercel.app](https://your-app.vercel.app) <!-- update after deploy -->



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


## Author

**Saim Bin Zahid** — Software Engineer  
[LinkedIn](https://linkedin.com/in/saim-bin-zahid) · [GitHub](https://github.com/saimzhd11)
