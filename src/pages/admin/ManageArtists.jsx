import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function ManageArtists() {
  const [artists, setArtists] = useState([]);
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:5005/artists")
      .then((res) => setArtists(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (!isAdmin) return;

    axios
      .delete(`http://localhost:5005/artists/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      })
      .then(() => {
        setArtists((prev) => prev.filter((a) => a._id !== id));
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting artist");
      });
  };

  return (
    <div className="admin-page">
      <h2>Manage Artists</h2>

      <Link to="/admin/artists/create" className="admin-button">
        + Create Artist
      </Link>

      <ul className="admin-list">
        {artists.map((artist) => (
          <li key={artist._id} className="admin-item">
            <strong>{artist.name}</strong>

            {artist.genre && (
              <span className="admin-subtext"> — {artist.genre}</span>
            )}

            <span className="admin-subtext">
              {" "}
              ({artist.reviews?.length || 0} reviews)
            </span>

            <div>
              <Link
                to={`/admin/artists/${artist._id}/edit`}
                className="admin-edit"
              >
                Edit
              </Link>

              <button
                className="admin-delete"
                onClick={() => handleDelete(artist._id)}
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

export default ManageArtists;

