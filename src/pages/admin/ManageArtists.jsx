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
      <h2 className="admin-title">Manage Artists</h2>

      <Link to="/admin/artists/create" className="admin-create-btn">
        + Create Artist
      </Link>

      <div className="admin-list">
        {artists.map((artist) => (
          <div key={artist._id} className="admin-card">
            <div className="admin-card-left">
              <img
                src={artist.image}
                alt={artist.name}
                className="admin-thumb"
              />

              <div className="admin-card-info">
                <strong className="admin-card-title">{artist.name}</strong>

                {artist.genre && (
                  <p className="admin-card-sub">{artist.genre}</p>
                )}

                <p className="admin-card-sub">
                  {artist.reviews?.length || 0} reviews
                </p>
              </div>
            </div>

            <div className="admin-card-actions">
              <Link
                to={`/admin/artists/${artist._id}/edit`}
                className="admin-btn edit"
              >
                Edit
              </Link>

              <button
                className="admin-btn delete"
                onClick={() => handleDelete(artist._id)}
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

export default ManageArtists;
