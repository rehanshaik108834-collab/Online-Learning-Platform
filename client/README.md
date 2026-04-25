# Online Learning Platform

A comprehensive **Learning Management System (LMS)** built with the **MERN stack** (MongoDB, Express, React, Node.js). This project enables instructors to create and sell online courses while allowing students to browse, purchase, and track their learning progress.

## Features

### Student Features
- User authentication (signup/login with JWT)
- Browse published courses with advanced filtering
- View detailed course information and preview free lectures
- Purchase courses instantly with Buy Now
- Track learning progress per course and lecture
- View purchased courses library
- Mark lectures as viewed and track completion status

### Instructor Features
- Create and manage courses
- Upload course media (videos, images) to Cloudinary
- Edit course details and curriculum
- Publish/unpublish courses
- View enrolled students per course
- Track student purchases and progress

## Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite** - Modern build tool with HMR
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless component library
- **Framer Motion** - Animation library
- **React Player** - Video playback

### Backend
- **Express.js** - Web framework
- **Node.js** - JavaScript runtime
- **MongoDB + Mongoose** - Document database and ODM
- **JWT + bcryptjs** - Authentication and security
- **Cloudinary SDK** - Cloud media storage
- **Multer** - File upload handling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for media hosting)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Online-Learning-Platform
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Create `.env` file in server directory**
   ```bash
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/lms-db
   JWT_SECRET=your-super-secret-jwt-key
   CLIENT_URL=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

### Running the Application

1. **Start MongoDB** (if running locally)

2. **Start the server**
   ```bash
   cd server
   npm run dev
   ```

3. **Start the client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```

The application will be available at:
- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

## Project Structure

```
Online-Learning-Platform/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Global state management
│   │   ├── services/        # API service calls
│   │   └── config/          # Configuration files
│   └── package.json
│
└── server/                  # Express backend
    ├── controllers/         # Business logic
    ├── models/              # Database models
    ├── routes/              # API routes
    ├── middleware/          # Custom middleware
    ├── helpers/             # Utility functions
    └── package.json
```

## Available Scripts

### Server
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Client
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Author

**Shaik Rehan** - [rehanshaik3106@gmail.com](mailto:rehanshaik3106@gmail.com)

## License

ISC
