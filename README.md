# Online Learning Platform

A comprehensive **Learning Management System (LMS)** built with the **MERN stack** (MongoDB, Express, React, Node.js). This project enables instructors to create and sell online courses while allowing students to browse, purchase, and track their learning progress.

## 🎯 Features

### Student Features
- ✅ User authentication (signup/login with JWT)
- ✅ Browse published courses with advanced filtering and sorting
- ✅ View detailed course information and preview free lectures
- ✅ Secure course purchase with instant checkout
- ✅ Track learning progress per course and lecture
- ✅ View purchased courses library
- ✅ Mark lectures as viewed and track completion status

### Instructor Features
- ✅ Create and manage courses
- ✅ Upload course media (videos, images) to Cloudinary
- ✅ Edit course details, titles, and curriculum
- ✅ Publish/unpublish courses
- ✅ View enrolled students per course
- ✅ Track student purchases and progress

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library
- **Vite** - Lightning-fast build tool with HMR
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with request/response interceptors
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible, headless component library
- **Framer Motion** - Smooth animations
- **React Player** - Video playback support

### Backend
- **Express.js** - Flexible web framework
- **Node.js** - JavaScript runtime
- **MongoDB + Mongoose** - Document database with schema validation
- **JWT + bcryptjs** - Secure authentication and password hashing
- **Cloudinary SDK** - Cloud media storage and delivery
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas cloud)
- Cloudinary account (free tier available)

### Installation

1. **Navigate to project directory**
   ```bash
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

### Environment Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/lms-db

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173

# Cloudinary (Media Hosting)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### Running the Application

#### Start MongoDB (if using local)
```bash
mongod
```

#### Terminal 1: Start Backend Server
```bash
cd server
npm run dev
```

#### Terminal 2: Start Frontend Dev Server
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📁 Project Structure

```
Online-Learning-Platform/
│
├── client/                          # React Frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js     # Axios config with JWT interceptor
│   │   ├── components/
│   │   │   ├── common-form/         # Reusable form component
│   │   │   ├── ui/                  # Radix UI wrapper components
│   │   │   ├── route-guard/         # Route protection component
│   │   │   ├── student-view/        # Student-specific components
│   │   │   └── instructor-view/     # Instructor-specific components
│   │   ├── pages/
│   │   │   ├── auth/                # Login/Signup page
│   │   │   ├── student/             # Student pages
│   │   │   └── instructor/          # Instructor pages
│   │   ├── context/
│   │   │   ├── auth-context/        # Global auth state
│   │   │   ├── student-context/     # Student-specific state
│   │   │   └── instructor-context/  # Instructor-specific state
│   │   ├── services/                # API service layer
│   │   ├── config/                  # Form configurations
│   │   └── App.jsx                  # Main app component
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
│
└── server/                          # Express Backend
    ├── controllers/
    │   ├── auth-controller/         # Authentication logic
    │   ├── instructor-controller/   # Instructor operations
    │   └── student-controller/      # Student operations
    ├── models/
    │   ├── User.js                  # User schema
    │   ├── Course.js                # Course schema
    │   ├── Order.js                 # Order/Payment schema
    │   ├── StudentCourses.js        # Student purchases
    │   └── CourseProgress.js        # Learning progress
    ├── routes/
    │   ├── auth-routes/             # Auth endpoints
    │   ├── instructor-routes/       # Instructor endpoints
    │   └── student-routes/          # Student endpoints
    ├── middleware/
    │   └── auth-middleware.js       # JWT verification
    ├── helpers/
    │   ├── cloudinary.js            # Cloudinary integration
    ├── server.js                    # Server entry point
    ├── package.json
    ├── .env                         # Environment variables
    └── README.md
```

## 🔐 Authentication Flow

1. **User Registration**: User signs up with email and password
2. **Password Hashing**: Password is hashed with bcryptjs (10 salt rounds)
3. **Login**: User logs in → Server validates credentials → Issues JWT token
4. **Token Storage**: Frontend stores JWT in sessionStorage
5. **Requests**: Axios interceptor automatically adds JWT to Authorization header
6. **Protected Routes**: Auth middleware verifies token on protected endpoints
7. **Role-Based Access**: Route guards redirect users based on role (student/instructor)

## 💳 Instant Purchase Flow

1. **Order Creation**: Student clicks buy now
2. **Auto confirmation**: The server creates the order and marks it confirmed
3. **Access granted**: Course is added to the student's purchased course list immediately

## 🎬 Media Upload (Cloudinary)

- **Upload**: Files uploaded via Multer → Sent to Cloudinary
- **Storage**: Files stored in cloud with automatic CDN delivery
- **Embed**: File URLs and public IDs stored in course curriculum
- **Delete**: Files can be deleted from Cloudinary when removed from courses
- **Progress**: Real-time upload progress tracking

## 📊 Database Models

### User
- Email, username, password (hashed), role (student/instructor)

### Course
- Title, description, price, level, language, category
- Embedded curriculum (lectures with video URLs)
- Enrolled students list
- Publish status

### Order
- User and course information
- Order status
- Order timestamp

### CourseProgress
- User ID and course ID
- Overall completion status and date
- Individual lecture progress tracking

### StudentCourses
- User's purchased courses list
- Purchase date and course metadata

## 🚀 Deployment Ready

The project is structured for easy deployment to:
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Heroku, Railway, AWS EC2, DigitalOcean
- **Database**: MongoDB Atlas (cloud)
- **Media**: Cloudinary (included)
- **Media**: Cloudinary (included)

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/lms-db` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key` |
| `CLIENT_URL` | Frontend URL (for CORS) | `http://localhost:5173` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `your-api-key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your-api-secret` |

## 📦 Available Scripts

### Server Scripts
```bash
npm run dev      # Start server with auto-reload (nodemon)
npm start        # Start production server
npm test         # Run tests
```

### Client Scripts
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 🤝 Contributing

This is a personal learning management system project. Feel free to extend and modify based on your needs.

## 👤 Author

**Shaik Rehan**
- Email: rehanshaik3106@gmail.com
- GitHub: [GitHub Profile]

## 📄 License

ISC

---

**Happy Learning! 🎓**
