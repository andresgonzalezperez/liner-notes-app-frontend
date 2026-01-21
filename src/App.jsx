import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Albums from "./pages/Albums";
import Artists from "./pages/Artists";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Navbar />

      <main className="main-container">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;


