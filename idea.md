
# EventSphere  
## Scalable Event Ticketing & Seat Reservation System

## 1. Overview

EventSphere is a full-stack event ticketing and seat reservation platform designed with a backend-first approach. The system focuses on real-time seat booking, concurrency control, transactional integrity, and clean software architecture using TypeScript.

The application simulates a production-grade event booking system where multiple users can attempt to reserve seats simultaneously. The backend ensures consistency, prevents double booking, manages seat locks, and handles payment workflows safely.



## 2. Tech Stack

### Backend
- TypeScript
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Redis (optional for seat locking optimization)

### Frontend
- React (TSX)
- TypeScript
- Axios
- React Router

---

## 3. Core Features

### User Features
- Register/Login (JWT authentication)
- Browse events
- View seat layout
- Select and lock seats
- Complete payment
- View booking history
- Cancel booking (based on policy)

### Admin Features
- Create venues
- Configure seating layouts
- Create/manage events
- Set pricing rules
- View revenue and occupancy analytics

---

## 4. Key Backend Engineering Concepts

- Real-time seat locking (temporary hold mechanism)
- Concurrency control using transactions
- Booking lifecycle state machine
- Payment rollback handling
- Strategy-based pricing and refund engine
- Clean layered architecture (Controller → Service → Repository)

---

## 5. Why This Is Not Just CRUD

This project includes:
- Seat state transitions (AVAILABLE → LOCKED → BOOKED)
- Transaction-safe booking workflows
- Time-based seat expiry
- Conflict resolution for simultaneous bookings
- Policy-based refund system

It demonstrates backend system design rather than basic data management.
