import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import Albums from "./pages/Albums";
import Artists from "./pages/Artists";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AlbumDetails from "./pages/AlbumDetails";
import ArtistDetails from "./pages/ArtistDetails";
import ProfilePage from "./pages/ProfilePage";
import MyFavorites from "./pages/MyFavorites";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageArtists from "./pages/admin/ManageArtists";
import ManageAlbums from "./pages/admin/ManageAlbums";
import ManageUsers from "./pages/admin/ManageUsers";
import CreateArtist from "./pages/admin/CreateArtist";
import CreateAlbum from "./pages/admin/CreateAlbum";
import EditArtist from "./pages/admin/EditArtist";
import EditAlbum from "./pages/admin/EditAlbum";

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
          <Route path="/albums/:albumId" element={<AlbumDetails />} />
          <Route path="/artists/:artistId" element={<ArtistDetails />} />
          <Route path="/my-favorites" element={<MyFavorites />} />

          {/* User protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Admin protected routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/artists"
            element={
              <ProtectedRoute adminOnly={true}>
                <ManageArtists />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/albums"
            element={
              <ProtectedRoute adminOnly={true}>
                <ManageAlbums />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly={true}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/artists/create"
            element={
              <ProtectedRoute adminOnly={true}>
                <CreateArtist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/albums/create"
            element={
              <ProtectedRoute adminOnly={true}>
                <CreateAlbum />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/artists/:artistId/edit"
            element={
              <ProtectedRoute adminOnly={true}>
                <EditArtist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/albums/:albumId/edit"
            element={
              <ProtectedRoute adminOnly={true}>
                <EditAlbum />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>
    </>
  );
}

export default App;

