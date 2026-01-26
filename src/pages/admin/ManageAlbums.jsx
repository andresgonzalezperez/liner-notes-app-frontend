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
      <h2>Manage Albums</h2>

      <Link to="/admin/albums/create" className="admin-button">
        + Create Album
      </Link>

      <ul className="admin-list">
        {albums.map((album) => (
          <li key={album._id} className="admin-item">
            <strong>{album.title}</strong>
            {album.artist && (
              <span className="admin-subtext"> — {album.artist.name}</span>
            )}
            <span className="admin-subtext">
              {" "}
              ({album.reviews?.length || 0} reviews)
            </span>

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
