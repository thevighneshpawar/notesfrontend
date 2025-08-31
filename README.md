# Notes Frontend

A modern, responsive web application for creating, managing, and organizing personal notes. Built with React, TypeScript, and Tailwind CSS, this application provides a clean and intuitive interface for note-taking with secure user authentication.

## 🚀 Features

- **User Authentication**: Secure signup and signin with OTP verification
- **Note Management**: Create, read, update, and delete notes
- **Real-time Updates**: Instant UI updates when notes are modified
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Protected Routes**: Secure access to notes with authentication guards
- **Modern UI**: Clean and intuitive interface built with Tailwind CSS
- **TypeScript**: Full type safety for better development experience

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.12
- **Routing**: React Router DOM 7.8.2
- **HTTP Client**: Axios 1.11.0
- **Icons**: Lucide React 0.542.0
- **Build Tool**: Vite 7.1.2
- **Linting**: ESLint 9.33.0

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd notes-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📁 Project Structure

```
notes-frontend/
├── public/                 # Static assets
├── src/
│   ├── api/               # API service functions
│   │   ├── auth.ts        # Authentication API calls
│   │   ├── axios.ts       # Axios configuration
│   │   └── notes.ts       # Notes API calls
│   ├── assets/            # Images and static files
│   ├── components/        # Reusable React components
│   │   ├── Navbar.tsx     # Navigation component
│   │   ├── NoteCard.tsx   # Individual note display
│   │   └── PrivateRoute.tsx # Route protection
│   ├── context/           # React context providers
│   │   ├── AuthContext.ts # Authentication context
│   │   ├── AuthProvider.tsx # Auth provider component
│   │   └── useAuth.ts     # Custom auth hook
│   ├── pages/             # Page components
│   │   ├── Notes.tsx      # Main notes page
│   │   ├── Signin.tsx     # Sign in page
│   │   └── Signup.tsx     # Sign up page
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Application entry point
├── package.json           # Project dependencies
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## 🔐 Authentication Flow

1. **Signup**: Users provide name, date of birth, and email
2. **OTP Verification**: Email-based OTP verification for account activation
3. **Signin**: Email-based authentication with OTP
4. **Session Management**: JWT-based session management with refresh tokens
5. **Protected Routes**: Automatic redirection to signin for unauthenticated users

## 📝 API Integration

The application integrates with a backend API for:

- **Authentication**: User registration, login, and session management
- **Notes CRUD**: Create, read, update, and delete notes
- **User Profile**: Fetch and manage user information

### API Endpoints

- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/verify-otp` - OTP verification
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get user profile
- `GET /notes` - Fetch all notes
- `POST /notes` - Create new note
- `PUT /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note

## 🎨 UI Components

- **Navbar**: Navigation with user info and logout
- **NoteCard**: Individual note display with edit/delete actions
- **Forms**: Signup, signin, and note creation/editing forms
- **Loading States**: Skeleton loading and spinner components
- **Responsive Layout**: Mobile-first design approach

## 🔒 Security Features

- **Protected Routes**: Authentication-based route protection
- **Token Management**: Secure JWT token handling
- **Input Validation**: Form validation and sanitization
- **Error Handling**: Graceful error handling and user feedback

## 🚀 Deployment

The application is configured for deployment on Vercel with the following configuration:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x or higher

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Version History

- **v0.0.0** - Initial release with basic note management and authentication

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
