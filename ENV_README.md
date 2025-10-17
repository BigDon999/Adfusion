# Environment variables for uploads (S3) and local development

This project supports uploads via S3 in production (recommended for Vercel). For local development the server will fall back to saving uploaded files to `public/assets/` if S3 is not configured.

Files provided:

- `.env.example` — example variables to set in your Vercel project's Environment Variables. Do not commit real secrets.
- `.env.local.example` — template for local development. Copy to `.env.local` and fill values if desired.

Required environment variables (for S3 uploads):

- AWS_REGION — AWS region, e.g. `us-east-1`
- AWS_S3_BUCKET — S3 bucket name
- AWS_ACCESS_KEY_ID — Access key ID with PutObject permission for the bucket
- AWS_SECRET_ACCESS_KEY — Corresponding secret key

How to configure on Vercel:

1. In your Vercel dashboard, open the project settings.
2. Go to Environment Variables and add the four variables above.
3. Redeploy the project.

Notes:

- Vercel runs serverless functions and has an ephemeral filesystem. To persist uploads on Vercel you must use S3.
- The admin UI attempts a presigned PUT to S3 first. If that fails it falls back to a server upload; on Vercel that fallback is intentionally blocked when S3 is not configured to avoid confusing ephemeral writes.
