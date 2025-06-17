import React from "react"
import LandingPage from "./Pages/LandinPage"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"
import useAuthStore from "./Zustand/authStore"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast";
import Sessions from "./Pages/Sessions"
import CreateSession from "./Pages/CreateSession"
import ShowSession from "./Pages/ShowSession"

function App() {

  const { user, loading, initialCheckDone, initialize } = useAuthStore();

  useEffect(() => {
    if (!initialCheckDone) {
      initialize();
    }
  }, [initialCheckDone, initialize]);

  return (
    <BrowserRouter>
      <Toaster
        reverseOrder={false}
        position="top-right"

        toastOptions={{
          duration: 2000,
          style: {

            background: '#1e3a8a',
            color: '#ffffff',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
          },
        }}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/sessions"
          element={user ? <Sessions /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/sessions/create"
          element={user ? <CreateSession /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <SignupPage />}
        />
        <Route
          path="/sessions/:id"
          element={user ? <ShowSession /> : <Navigate to="/login" replace />}
        />
      </Routes>

    </BrowserRouter>
  )
}

export default App
