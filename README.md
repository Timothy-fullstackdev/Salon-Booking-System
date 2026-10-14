# Salon Booking System

A full-stack salon booking platform currently under development, built with HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, and Mongoose.

## Features

- User account registration
- User login
- Dashboard navigation
- Persistent user ID across page refreshes using localStorage
- Express API routes for users and posts
- MongoDB data persistence

More salon management and booking features are being developed.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **ODM:** Mongoose

## Getting Started

### Requirements

- Node.js and npm
- MongoDB installed and running locally, or a configured MongoDB connection string

### Installation

Clone the repository:

```bash
git clone https://github.com/Timothy-fullstackdev/Salon-Booking-System.git
cd Salon-Booking-System
```

Install dependencies:

```bash
npm install
```

Ensure MongoDB is running. The current local development database is:

```text
mongodb://127.0.0.1:27017/FullStack-Guru
```

Start the backend:

```bash
node app.js
```

The server uses port `3000` by default.

Open `http://localhost:3000` if Express serves the frontend. Otherwise, open `index.html` using a local development server.

## Current API Routes

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/users` | Create a user |
| GET | `/users` | Retrieve users |
| GET | `/users/:id` | Retrieve a user by ID |
| POST | `/login` | Authenticate a user |
| GET | `/posts` | Retrieve posts with associated user data |
| GET | `/posts/:id` | Retrieve a post and its associated user |

## Database Configuration

The MongoDB database is not included in this repository. Anyone running the project must configure their own database.

The project currently uses a local MongoDB connection. Hosted database support can be configured later using an environment variable such as `MONGODB_URI`.

Never commit database credentials or `.env` files to GitHub.

## Project Status

**In progress.** Authentication improvements, salon booking functionality, and deployment preparation are ongoing.

## Author

**Timothy Jamukeni**

[GitHub Profile](https://github.com/Timothy-fullstackdev)
