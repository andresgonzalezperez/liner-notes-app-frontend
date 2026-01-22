import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ManageAlbums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/albums")
      .then((res) => setAlbums(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (albumId) => {
    axios
      .delete(`http://localhost:5005/albums/${albumId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then(() => {
        setAlbums(albums.filter((album) => album._id !== albumId));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="admin-page">
      <h2>Manage Albums</h2>

      <Link to="/admin/albums/create" className="admin-button">
        + Create Album
      </Link>

      <ul className="admin-list">
        {albums.map((album) => (
          <li key={album._id} className="admin-item">
            {album.title}

            <div>
              <Link
                to={`/admin/albums/${album._id}/edit`}
                className="admin-edit"
              >
                Edit
              </Link>

              <button
                className="admin-delete"
                onClick={() => handleDelete(album._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageAlbums;
