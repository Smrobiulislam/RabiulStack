# NovaStack Frontend

GitHub-ready React + Vite frontend with no folders.

## Files

- index.html
- package.json
- vite.config.js
- main.jsx
- App.jsx
- api.js
- styles.css

## Run locally

```bash
npm install
npm run dev
```

## Backend connection

By default the frontend uses:

http://localhost:5000/api

For a deployed backend, create a Vercel environment variable:

VITE_API_URL=https://your-backend.onrender.com/api

Then redeploy.

## GitHub

Upload all files from this folder to the root of your GitHub repository.

Do not upload `.env` files or secrets.
