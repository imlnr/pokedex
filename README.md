# PokéDex

Welcome to **PokéDex**, a modern and fully responsive Pokémon web application built using **React** for the frontend and **Node.js** for the backend. This project offers a seamless and interactive experience for browsing, searching, and exploring detailed information about all your favorite Pokémon.

Powered by the **PokéAPI**, PokéDex delivers real-time data with a clean UI and smooth performance. Whether you're a casual fan or a true Pokémon Master, this app is designed to make your Pokémon journey engaging and intuitive.

## 🚀 Tech Stack

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express
- **API Integration:** PokéAPI
- **Authentication (optional):** Google OAuth / JWT (if used)
- **Deployment:** Vercel / Render (customize as needed)

---


## 🌐 Live Demo

- Frontend: [https://gallgher-and-mohan.vercel.app/](https://gallgher-and-mohan.vercel.app/)
- Backend API: [https://gallgher-and-mohan.onrender.com](https://gallgher-and-mohan.onrender.com)

## 📸 Screenshots

#### Landing Page:
`/`
<img width="1425" alt="Screenshot 2025-06-08 at 3 06 49 PM" src="https://github.com/user-attachments/assets/1f8f0a36-0711-4c7c-81c3-5677aeb02192" />
#### Login Page:
`/login`
<img width="1470" alt="Screenshot 2025-06-07 at 11 06 05 PM" src="https://github.com/user-attachments/assets/0cd485fc-b9ee-4d74-bf88-44fee589224f" />
#### Pokemon Dashboard:
`/dashboard`
<img width="1425" alt="Screenshot 2025-06-07 at 10 56 02 PM" src="https://github.com/user-attachments/assets/ddc0daa2-72ee-4688-9139-be83ebe36a38" />
#### Single Pokemon view:
> Use arrow keys (-> ,<-) to navigate on desktop, or swipe left/right on mobile devices.
<img width="1470" alt="Screenshot 2025-06-08 at 3 10 00 PM" src="https://github.com/user-attachments/assets/a5125abc-3221-4173-8c0b-540b0992af4d" />
#### Search View:
<img width="1425" alt="Screenshot 2025-06-07 at 10 57 35 PM" src="https://github.com/user-attachments/assets/c96a362f-5aa4-4f6e-93f3-6b420f4071b1" />
#### Searched single Pokemon View:
> Use arrow keys (-> ,<-) to navigate on desktop, or swipe left/right on mobile devices.
<img width="1470" alt="Screenshot 2025-06-08 at 3 13 42 PM" src="https://github.com/user-attachments/assets/b8a47e5a-f8d6-49d4-89b5-2ad6ddd64705" />
#### Profile View:
`/profile`
<img width="1424" alt="Screenshot 2025-06-07 at 10 59 30 PM" src="https://github.com/user-attachments/assets/451cf4e7-9c6b-497b-9384-d0d3d60c6d42" />
#### Sidebar Closed View:
<img width="1425" alt="Screenshot 2025-06-07 at 11 00 16 PM" src="https://github.com/user-attachments/assets/ecdea5a3-bf39-43d1-8cb0-5d9577cc0c56" />


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

## 🔐 Environment Variables

### Frontend (.env)
Create a `.env` file in the server directory with the following variables:
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret
VITE_BACKEND_URL=backend_url
```

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


> Built with ❤️ by Laxminarayan Reddy
