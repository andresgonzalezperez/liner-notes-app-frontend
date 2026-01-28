import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function ManageAlbums() {
  const [albums, setAlbums] = useState([]);
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:5005/albums")
      .then((res) => setAlbums(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (albumId) => {
    if (!isAdmin) return;

    axios
      .delete(`http://localhost:5005/albums/${albumId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then(() => {
        setAlbums((prev) => prev.filter((album) => album._id !== albumId));
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting album");
      });
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Manage Albums</h2>

      <Link to="/admin/albums/create" className="admin-create-btn">
        + Create Album
      </Link>

      <div className="admin-list">
        {albums.map((album) => (
          <div key={album._id} className="admin-card">
            <div className="admin-card-left">
              <img
                src={album.cover}
                alt={album.title}
                className="admin-thumb"
              />

              <div className="admin-card-info">
                <strong className="admin-card-title">{album.title}</strong>

                {album.artist && (
                  <p className="admin-card-sub">
                    {album.artist.name}
                  </p>
                )}

                <p className="admin-card-sub">
                  {album.reviews?.length || 0} reviews
                </p>
              </div>
            </div>

            <div className="admin-card-actions">
              <Link
                to={`/admin/albums/${album._id}/edit`}
                className="admin-btn edit"
              >
                Edit
              </Link>

              <button
                className="admin-btn delete"
                onClick={() => handleDelete(album._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageAlbums;

