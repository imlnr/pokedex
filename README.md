# Gallagher and Mohan

A modern web application built with React and Node.js, featuring a robust frontend and backend architecture.

## 🌐 Live Demo

- Frontend: [https://gallgher-and-mohan.vercel.app/](https://gallgher-and-mohan.vercel.app/)
- Backend API: [https://gallgher-and-mohan.onrender.com](https://gallgher-and-mohan.onrender.com)

## 📸 Screenshots

<img src="https://github.com/user-attachments/assets/2d68e7d5-3643-4950-a9b5-be51a1f9c94e" width="400" alt="Screenshot 1"/>
<img src="https://github.com/user-attachments/assets/e0ab25d6-bf45-4200-89cc-27186dcb74ea" width="400" alt="Screenshot 2"/>
<img src="https://github.com/user-attachments/assets/ed237f41-6074-42af-a944-89fa4f0fc774" width="400" alt="Screenshot 3"/>
<img src="https://github.com/user-attachments/assets/3ed98309-cea0-42de-a6ae-fcb1bc47f3fe" width="400" alt="Screenshot 4"/>

## 🚀 Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Redux for state management
- React Router for navigation
- TailwindCSS for styling
- Radix UI components
- Google OAuth integration

### Backend
- Node.js
- Express.js
- TypeScript
- Google Auth Library
- CORS enabled
- Environment variables support

## 📦 Project Structure

```
gallgher-and-mohan/
├── client/                 # Frontend React application
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── dist/              # Build output
└── server/                # Backend Node.js application
    ├── controllers/       # Route controllers
    ├── models/           # Data models
    ├── routes/           # API routes
    └── middlewares/      # Custom middlewares
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with required environment variables
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript files
- `npm start` - Start production server

## 🔐 Environment Variables

### Backend (.env)
Create a `.env` file in the server directory with the following variables:
```
PORT=5000
GOOGLE_CLIENT_ID=your_google_client_id
```

## 📝 License

This project is licensed under the ISC License.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
