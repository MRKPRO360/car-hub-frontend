# Car Management Frontend

This is the frontend of the Car Management System, built with React, Redux Toolkit, and Redux Query, and styled using Tailwind CSS.

## 🚀 Features

- State management using Redux Toolkit & Redux Query
- Authentication with JWT
- API integration with endpoints for Cars, Orders, and Users
- Protected routes for admin and user roles
- Dynamic filtering and management of cars
- User-friendly UI with React Router for navigation

## 🛠️ Tech Stack

- **React**: UI library
- **Redux Toolkit**: State management
- **Redux Query**: API calls and caching
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **Sonner**: Toast notifications

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```sh
 git clone https://github.com/your-repo.git
 cd car-frontend
```

### 2️⃣ Install dependencies

```sh
 npm install
```

### 3️⃣ Start the development server

```sh
 npm run dev
```

The app should now be running on `http://localhost:5173/` (if using Vite).

## 🌍 Environment Variables

Create a `.env` file in the root and configure:

```env
VITE_API_BASE_URL=http://your-api-url.com
```

## 🔧 Project Structure

```
/src
├── api          # Base API setup
├── components   # Reusable components
├── features     # Redux slices
├── pages        # Pages for routing
├── redux        # Store configuration
├── routes       # React Router setup
└── styles       # Tailwind styles
```

## 🔌 State Management & API Integration

### Store Configuration (`store.ts`)

- Uses `persistReducer` for auth state persistence
- Middleware includes `baseApi.middleware`

### API Services (`baseApi.ts`)

- **Car Management:** CRUD operations on cars
- **Order Management:** Order placement, verification
- **User Management:** Authentication and profile updates

## 🏗️ Building for Production

```sh
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a PR with a detailed description

## 📜 License

This project is licensed under the MIT License.
