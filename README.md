# Halen Technologies Ticket Management System

A full-stack application for managing customer onboarding tickets with a React frontend and Express backend.

## Quick Setup

### Backend

```bash
# Install dependencies
cd backend
npm install

# Create .env file
echo "DATABASE_URL=\"postgresql://postgres:1123@localhost:5432/restaurantdb\"" > .env
echo "PORT=8001" >> .env

# Start PostgreSQL using Docker
docker-compose up -d

# Run migrations and seed data
npx prisma migrate dev
npm run seed

# Start the backend server
npm run dev
```

### Frontend

```bash
# Install dependencies
cd frontend
npm install

# Start the development server
npm run dev
```

## Features

- View all tickets with status indicators
- Filter tickets by status (open, pending, done)
- Search by customer name or email
- Update ticket status and notes

## Tech Stack

- **Frontend**: React, TypeScript, Bootstrap
- **Backend**: Node.js, Express, Prisma
- **Database**: PostgreSQL (Docker)

## API Endpoints

- `GET /tickets` - List all tickets
- `GET /tickets/:id` - Get single ticket
- `PATCH /tickets/:id` - Update ticket status/notes

## Browser Access

- Frontend: http://localhost:5173
- Backend API: http://localhost:8001
