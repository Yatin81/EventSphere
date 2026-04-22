#EventSphere — Scalable Event Ticketing & Seat Reservation System

EventSphere is a full-stack event ticketing and seat reservation platform built with a **backend-first approach**, focusing on real-world system design challenges like concurrency, transactional integrity, and seat locking.

Unlike basic CRUD apps, this system simulates a **production-grade booking platform** where multiple users can reserve seats simultaneously without conflicts.

---

## Key Highlights
- Real-time seat locking system  
- Concurrency-safe booking workflow  
- Booking lifecycle management (AVAILABLE → LOCKED → BOOKED)  
- Transaction-safe operations with rollback handling  
- Strategy-based pricing & refund system  
- Clean layered architecture (Controller → Service → Repository)  

---

## Tech Stack
**Backend:** TypeScript, Node.js, Express.js, Prisma ORM, PostgreSQL, JWT  
**Frontend:** React (TSX), TypeScript, Axios, React Router  

---

## Features

**User**
- Authentication (JWT)
- Browse events & seat layouts  
- Select & lock seats  
- Booking & payment flow  
- Booking history  
- Cancel bookings (policy-based)  

**Admin**
- Create venues & seating layouts  
- Manage events  
- Set pricing rules  
- View analytics (revenue & occupancy)  

---

##  Core Engineering Concepts

- **Seat State Machine:** AVAILABLE → LOCKED → BOOKED  
- **Seat Locking:** Temporary holds with expiry to prevent conflicts  
- **Concurrency Control:** Handles simultaneous bookings safely  
- **Transactions:** Atomic booking operations (all or nothing)  
- **Payment Handling:** Rollback on failure to maintain consistency  
- **Strategy Systems:** Dynamic pricing + policy-based refunds  

---

## Architecture

Controller → Service → Repository → Database  

- Controller: Handles requests  
- Service: Business logic  
- Repository: Database layer (Prisma)  
- Database: PostgreSQL  

---

## Project Structure

/backend → controllers, services, repositories, middlewares  
/frontend → components, pages, api  

---

##  Setup

```bash
git clone https://github.com/Yatin81/eventsphere.git
cd eventsphere

Backend

cd backend
npm install
npx prisma migrate dev
npm run dev

Create .env:

DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret

Frontend

cd frontend
npm install
npm run dev
