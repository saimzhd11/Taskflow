Deployment notes

Frontend
- Set `VITE_API_URL` in your frontend environment to the full backend URL, e.g. `https://api.example.com`.
- Build and deploy the frontend (Vite). Example:

```
# set env var (example)
export VITE_API_URL=https://api.example.com
npm run build --prefix frontend
# then deploy the files in frontend/dist to your static host
```

Backend
- Ensure `CLIENT_URL` in backend `.env` matches your deployed frontend origin, e.g. `https://app.example.com`.
- Start the backend with the same `.env` values. Example:

```
# backend
export CLIENT_URL=https://app.example.com
export PORT=5000
npm start --prefix backend
```

Notes
- The frontend now reads `VITE_API_URL` (fallback `/api` for local dev/proxy).
- The backend uses `CLIENT_URL` for CORS (already implemented in `backend/server.js`).
- When deploying: set the frontend `VITE_API_URL` to the backend base URL, and set backend `CLIENT_URL` to the frontend origin.
