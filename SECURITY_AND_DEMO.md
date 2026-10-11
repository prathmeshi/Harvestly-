# Harvestly presentation build

## What changed
- Responsive landing page with mobile navigation, small-screen layouts, animation, hover states, accessible focus styles, and reduced-motion support.
- Appearance picker: Light, Dark, and System. Selection persists in local storage; System follows the OS appearance preference.
- Express API hardening: Helmet security headers, CORS restricted to the configured frontend origin, JSON body size limit, generic rate limit, stricter auth rate limit, validation, and generic error responses.
- Registration/login endpoints backed by MongoDB. Passwords are salted and hashed with bcrypt (12 rounds); plaintext passwords are never stored. Session JWT is held in an HttpOnly, SameSite=Strict cookie.
- Basic health endpoint and demo product API.

## Start the frontend
```powershell
cd mern_project
npm install
npm start
```

## Start the API
Use Node.js 18 or newer and a running local MongoDB or MongoDB Atlas database.
```powershell
cd server
npm install
Copy-Item .env.example .env
```
Edit `server/.env`: set `MONGODB_URI` and generate a random `JWT_SECRET` (at least 32 characters). Do not use the example secret in a real deployment.
```powershell
npm start
```
The API uses `http://localhost:5000` and expects the frontend at `http://localhost:3000` by default. Set `CLIENT_ORIGIN` to the exact deployed frontend origin in production. Production requires HTTPS so secure cookies are enabled.

## Auth endpoints
- `POST /api/auth/register` with `{ "name", "email", "password" }`
- `POST /api/auth/login` with `{ "email", "password" }`
- `GET /api/auth/me` (requires the session cookie)
- `POST /api/auth/logout`
- `GET /api/health`
- `GET /api/products`

Passwords must be 12–72 characters and contain lowercase, uppercase, and a number. Auth is rate-limited to 8 failed attempts per 15 minutes per IP; all API routes have a general rate limit. The frontend's sign-in button is still a presentation placeholder and is not yet wired to these endpoints.

## Before a public/production deployment
- Use HTTPS, a managed database with least-privilege credentials, secret-manager environment variables, database backups, and monitoring.
- Configure the real frontend origin and rate limits for your deployment/proxy topology. If using multiple API instances, use a shared rate-limit store (the default in-memory store is per-process).
- Add email verification, password reset, account lockout/abuse monitoring, CSRF review for any cross-site cookie deployment, and automated security tests before real user accounts are accepted.
- Demo produce listings in the frontend are sample content; do not present them as live inventory.
