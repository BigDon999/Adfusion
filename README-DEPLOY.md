Deploying the Admin Panel

This project includes a small admin panel at `/admin` and server routes under `app/api/*` that read/write `data/projects.json` and upload images to `public/assets/`.

Options

1. Local / VPS / Render (writable disk)

- The upload endpoint writes files into `public/assets/`. This works when your server has a writable filesystem (e.g., local dev, a VPS, or Render with persistent disk).
- Deploy steps (Render):
  - Push repository
  - Create a new Web Service with Node/npm build
  - Set `npm run build` and `npm start` or use Next.js defaults

2. Vercel (serverless)

- Vercel's serverless functions have an ephemeral filesystem. For reliable image uploads in production, configure AWS S3 and set environment variables:
  - AWS_REGION
  - AWS_S3_BUCKET
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY
- When S3 env vars are present, the upload API will send files to S3 and return the public S3 URL.

Env vars and security

- The admin UI is NOT authenticated. Add authentication (NextAuth or simple password) before exposing the admin in production.
- Keep your AWS keys secret and configure them in the hosting provider's environment variables.

Notes

- The data store uses `data/projects.json` for simplicity. For production, migrate to a proper DB.
- The admin UI expects image URLs or lets you upload images via the file input (which saves to `public/assets/` locally or S3 in production).

Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm start`

If you'd like, I can:

- Add NextAuth-based authentication to protect `/admin`.
- Replace the filesystem JSON with a simple SQLite DB (better for production) and wire migrations.
