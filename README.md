# Social Media Platform

A modern, full-stack social media application built with the MERN stack (MongoDB, Express, React, Node.js) featuring real-time interactions, responsive design, and a scalable architecture.

## 🚀 Features

### Core Features
- **User Authentication** - Secure registration, login, and JWT-based authentication
- **User Profiles** - Customizable profiles with bio, avatar, and follower/following counts
- **Posts System** - Create, edit, delete posts with text and image support
- **Comments System** - Add comments to posts with real-time updates
- **Like System** - Like/unlike posts with instant feedback
- **Follow System** - Follow/unfollow users with personalized feeds
- **Search** - Find users by username or bio keywords
- **Responsive Design** - Mobile-first design that works on all devices

### Technical Features
- **RESTful API** - Well-structured API endpoints
- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Input Validation** - Comprehensive validation on both frontend and backend
- **Error Handling** - Graceful error handling throughout the application
- **Scalable Architecture** - Clean separation of concerns and modular code

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern functional components with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📁 Project Structure

```
SocialMediaApp/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── CommentSection.js
│   │   │   ├── CreatePost.js
│   │   │   ├── Navbar.js
│   │   │   ├── PostCard.js
│   │   │   └── ProtectedRoute.js
│   │   ├── context/        # React context for state management
│   │   │   ├── AuthContext.js
│   │   │   └── PostContext.js
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Profile.js
│   │   │   ├── UserProfile.js
│   │   │   ├── PostDetail.js
│   │   │   └── Search.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.css
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── server/                # Node.js backend
    ├── config/
    │   └── database.js
    ├── middleware/
    │   ├── auth.js
    │   └── errorHandler.js
    ├── models/             # MongoDB schemas
    │   ├── User.js
    │   ├── Post.js
    │   └── Comment.js
    ├── routes/             # API routes
    │   ├── auth.js
    │   ├── users.js
    │   ├── posts.js
    │   ├── comments.js
    │   └── follows.js
    ├── scripts/
    │   └── seed.js        # Database seeding script
    ├── .env.example
    ├── package.json
    └── server.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SocialMediaApp
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

4. **Set up environment variables**
   ```bash
   cd ../server
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/socialmedia
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:3000
   ```

5. **Start MongoDB**
   - If using local MongoDB: `mongod`
   - Or use MongoDB Atlas and update the `MONGODB_URI` in `.env`

6. **Seed the database (optional)**
   ```bash
   cd server
   npm run seed
   ```
   This will create sample users, posts, and comments for testing.

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

## 📚 API Documentation

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### User Routes
- `GET /api/users/:id` - Get user profile
- `GET /api/users` - Get all users (with search)
- `GET /api/users/:id/posts` - Get user's posts
- `GET /api/users/:id/followers` - Get user's followers
- `GET /api/users/:id/following` - Get users that user follows

### Post Routes
- `POST /api/posts` - Create new post
- `GET /api/posts` - Get all posts (feed)
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post

### Comment Routes
- `POST /api/comments` - Create comment
- `GET /api/comments/post/:postId` - Get post comments
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

### Follow Routes
- `POST /api/follows/:userId` - Follow user
- `DELETE /api/follows/:userId` - Unfollow user
- `GET /api/follows/status/:userId` - Check follow status
- `GET /api/follows/mutual/:userId` - Get mutual followers

## 🎨 UI/UX Features

- **Modern Design** - Clean, contemporary interface with smooth animations
- **Responsive Layout** - Mobile-first design that adapts to all screen sizes
- **Interactive Elements** - Hover effects, transitions, and micro-interactions
- **Accessibility** - Semantic HTML and ARIA labels where appropriate
- **Loading States** - Proper loading indicators for better UX
- **Error Handling** - User-friendly error messages and recovery options

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Input Validation** - Comprehensive validation on both frontend and backend
- **CORS Configuration** - Proper cross-origin resource sharing setup
- **Rate Limiting** - Protection against brute force attacks
- **Sanitized Inputs** - Protection against XSS attacks

## 🧪 Testing

The application includes comprehensive validation and error handling. To test:

1. **Manual Testing** - Use the seeded data or create your own accounts
2. **API Testing** - Use tools like Postman or Insomnia to test endpoints
3. **Browser Testing** - Test on different browsers and devices

## 📝 Sample Data

When you run the seed script, the following sample data is created:

**Users:**
- john_doe (john@example.com / password123)
- jane_smith (jane@example.com / password123)
- mike_wilson (mike@example.com / password123)
- sarah_jones (sarah@example.com / password123)
- alex_chen (alex@example.com / password123)

**Posts:** 10 sample posts with varied content
**Comments:** Random comments on posts
**Follows:** Random follow relationships between users

## 🚀 Deployment

### Frontend (React)
1. Build the production version: `npm run build`
2. Deploy the `build` folder to services like:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront

### Backend (Node.js)
1. Set production environment variables
2. Deploy to services like:
   - Heroku
   - AWS EC2
   - DigitalOcean
   - Google Cloud Platform

### Database
- Use MongoDB Atlas for production
- Set up proper indexes for performance
- Configure backup and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the flexible database solution
- All the open-source libraries that made this project possible

## 📞 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs
4. Provide your environment details (OS, Node version, etc.)

---

**Happy Coding! 🎉**
