import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditArtist() {
  const { artistId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5005/artists/${artistId}`)
      .then((res) => {
        setName(res.data.name);
        setGenre(res.data.genre);
        setPhoto(res.data.photo);
        setBio(res.data.bio || "");
      })
      .catch((err) => console.log(err));
  }, [artistId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:5005/artists/${artistId}`,
        { name, genre, photo, bio },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => navigate("/admin/artists"))
      .catch((err) => console.log(err));
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Edit Artist</h2>

      <input
        className="admin-input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="admin-input"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <input
        className="admin-input"
        placeholder="Photo URL"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />

      <textarea
        className="admin-input"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <button className="admin-button">Save Changes</button>
    </form>
  );
}

export default EditArtist;
