# Book Management (Client + Server)

A simple book library app. Add books, edit them, delete them, and browse with search, filters, and pagination. Built with a small Express + Prisma API and a React + Tailwind client.

## What this project is (in simple words)
- **Client (frontend)**: React app that shows a list of books with search, genre, and status filters. You can create, edit, and delete books in modals. It uses React Query for data and nice toasts for feedback.
- **Server (backend)**: Express API with Prisma (PostgreSQL). It exposes `/api/books` for CRUD and supports pagination, search by title/author, and filtering by `genre` and `status`.

## Tech stack
- **Frontend**: React 18, Vite, Tailwind CSS, React Query, React Router, React Hook Form, Yup, Headless UI, Lucide icons
- **Backend**: Node.js, Express, Prisma, PostgreSQL, express-validator, dotenv

## Folder structure
- `Bood_manahemt_client/` – React app (Vite)
- `Book_managemnet_server/` – Express + Prisma server

## Quick start
### 1) Backend (Express + Prisma)
1. Open a terminal in `Book_managemnet_server/`.
2. Create a `.env` file with your database connection:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
   APP_HOST=localhost
   APP_PORT=7700
   ```
3. Install and migrate:
   ```bash
   npm install
   npx prisma migrate deploy
   # or for first-time dev setup with existing migrations:
   # npx prisma migrate dev
   ```
4. Start the server (dev):
   ```bash
   npm run dev
   ```
   The API runs by default at `http://localhost:7700`.

### 2) Frontend (React + Vite)
1. Open another terminal in `Bood_manahemt_client/`.
2. Create `.env` with the API URL (optional if using default):
   ```env
   VITE_API_URL=http://localhost:7700
   ```
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```
   The app runs at the Vite dev URL (usually `http://localhost:5173`).

## Core features
- Book list with server-side pagination (10 per page)
- Search by title/author (case-insensitive)
- Filter by genre
- Filter by status (`Available` or `Issued`)
- Create, update, delete books
- Toast notifications and loading states

## API summary
Base URL: `http://localhost:7700`

- `GET /api/books?Page&limit&search&genre&status`
  - Returns `{ data, total, page, limit, totalPages }`
- `GET /api/books/:id`
- `POST /api/books`
  - Body: `{ title, author, genre, publishedYear, status }`
- `PUT /api/books/:id`
  - Body: `{ title, author, genre, publishedYear, status }`
- `DELETE /api/books/:id`

Validation errors return 400 with details; 404 for missing book; 204 on successful delete.

## Data model
Prisma model stored as `books` table with an enum `book_status`:
```prisma
model Book {
  id            String   @id @default(cuid())
  title         String
  author        String
  genre         String
  publishedYear Int
  status        BookStatus
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum BookStatus {
  Available
  Issued
}
```

## How the client talks to the server
- Base URL comes from `VITE_API_URL` or defaults to `http://localhost:7700`.
- Requests live in `src/services/http.js` and `src/services/bookService.js`.
- Data fetching/mutations use React Query hooks in `src/hooks/useBooks.js`.
- Global UI state (filters, pagination, modals) is handled by `src/contexts/BookContext.jsx`.

## Notes
- CORS is open in the server for dev convenience.
- Uploaded files folder exists, but the current book API does not use file upload.

## Scripts
- Backend: `npm run dev`, `npm run build`, `npm start`
- Frontend: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`
