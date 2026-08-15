# Romantic Question App

A small romantic full-stack Next.js app with JSON persistence.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Next.js Route Handlers
- JSON file persistence

## Run

```bash
npm install
npm run dev
```

Open:

http://localhost:3000

## Routes

- `/` — romantic question
- `/result` — latest answer
- `POST /api/response` — save answer
- `GET /api/response` — latest answer + count

Responses are stored in:

```text
data/responses.json
```

## Important

This persistence approach is intended for local/self-hosted Node.js deployments where the filesystem is writable.

It is **not suitable for Vercel/serverless production persistence**, because the local filesystem should not be treated as a permanent database there. For Vercel, replace `lib/response-store.ts` with a hosted database or KV/storage service.
