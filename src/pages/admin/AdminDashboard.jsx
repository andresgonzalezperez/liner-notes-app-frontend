import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { API_URL } from "../../../config/config";

function AdminDashboard() {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [users, setUsers] = useState([]);

  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const albumsReq = axios.get(`${API_URL}/albums`);
      const artistsReq = axios.get(`${API_URL}/artists`);

      const usersReq = isAdmin
        ? axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : Promise.resolve({ data: [] });

      const [albumsRes, artistsRes, usersRes] = await Promise.all([
        albumsReq,
        artistsReq,
        usersReq,
      ]);

      setAlbums(albumsRes.data);
      setArtists(artistsRes.data);
      setUsers(usersRes.data);

    } catch (error) {
      console.log("Error loading dashboard data:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Admin Dashboard</h1>
      <p className="admin-subtitle">
        Welcome to the administration panel. Select a section to manage the platform content.
      </p>

      <div className="admin-grid">

        <Link to="/admin/artists" className="admin-card">
          <h2>Artists</h2>
          <p>Manage all artists on the platform.</p>
          <p className="admin-count">Total: {artists.length}</p>
        </Link>

        <Link to="/admin/albums" className="admin-card">
          <h2>Albums</h2>
          <p>Manage all albums on the platform.</p>
          <p className="admin-count">Total: {albums.length}</p>
        </Link>

        <Link to="/admin/users" className="admin-card">
          <h2>Users</h2>
          <p>Control user roles and remove users.</p>
          <p className="admin-count">Total: {users.length}</p>
        </Link>

      </div>
    </div>
  );
}

export default AdminDashboard;

