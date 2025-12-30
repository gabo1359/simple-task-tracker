# Simple Task Tracker

A minimal full-stack task tracking application built with Ruby on Rails (API) and React.

## Live Demo

🚀 **[View Live Application](https://simple-task-tracker-2ljw.onrender.com)**

### Video Demonstration

https://github.com/user-attachments/assets/8478f6ca-4e07-45ee-9e42-83505005ea8a

## Architecture

**Monorepo structure** - Both frontend and backend are in the same repository for easier development and deployment coordination.

## Prerequisites

- Ruby 3.3.1
- Node.js 20.5.1
- SQLite3

## Setup Instructions

### Backend (Rails API)

1. Navigate to the API directory:
```bash
cd api
```

2. Install dependencies:
```bash
bundle install
```

3. Set up the database:
```bash
rails db:create db:migrate
```

4. Create a `.env` file with required environment variables:
```bash
CLIENT_URL=http://localhost:3001
API_KEY=your_api_key_here
```

5. Start the Rails server:
```bash
rails server -p 3000
```

The API will be available at `http://localhost:3000`

### Frontend (React)

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with required environment variables:
```bash
REACT_APP_API_URL=http://localhost:3000
REACT_APP_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
PORT=3001 npm start
```

The application will open at `http://localhost:3001`

## API Endpoints

### POST /tasks
Creates a new task.

**Request:**
```json
{
  "task": {
    "description": "Task description"
  }
}
```

**Response:**
```json
{
  "id": 1,
  "description": "Task description",
  "created_at": "2025-12-27T20:00:00.000Z",
  "updated_at": "2025-12-27T20:00:00.000Z"
}
```

### GET /tasks
Returns all tasks ordered by creation time (newest first).

**Response:**
```json
[
  {
    "id": 2,
    "description": "Second task",
    "created_at": "2025-12-27T20:01:00.000Z",
    "updated_at": "2025-12-27T20:01:00.000Z"
  },
  {
    "id": 1,
    "description": "First task",
    "created_at": "2025-12-27T20:00:00.000Z",
    "updated_at": "2025-12-27T20:00:00.000Z"
  }
]
```

## Testing

This project includes comprehensive unit tests for both the frontend and backend.

### Frontend Tests

The React application uses **Jest** and **React Testing Library** for unit and integration tests.

**Run all tests:**

```bash
cd client
npm test
```

### Backend Tests

The Rails API uses **RSpec** for testing.

**Run all specs:**

```bash
cd api
bundle exec rspec
```

## Features

- Create tasks with descriptions
- View all tasks in chronological order (newest first)
- Real-time updates without page refresh
- Clean, modern UI with gradient background
- Form validation
- API authentication with Bearer tokens
- CORS configured for cross-origin requests

## Technology Stack

**Backend:**
- Ruby on Rails 7.2.3 (API mode)
- SQLite3 database
- rack-cors for CORS handling
- dotenv-rails for environment variables

**Frontend:**
- React 19.2.3
- Create React App
- Custom hooks for state management
- CSS3 with modern design patterns

## Project Structure

```
simple-task-tracker/
├── api/                    # Rails API backend
│   ├── app/
│   │   ├── controllers/
│   │   └── models/
│   ├── config/
│   ├── db/
│   └── Gemfile
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Design Decisions

### Monorepo
Chose a monorepo structure to keep frontend and backend together, making it easier to:

- Track changes across both applications
- Share documentation
- Deploy as a cohesive unit
- Maintain consistent versioning

### API Authentication
Implemented a simple Bearer token authentication for security best practices.

### Custom Hooks
Used React custom hooks (`useTasks`) to separate business logic from UI components.

### Modern UI
Modern gradient design to improve user experience.
