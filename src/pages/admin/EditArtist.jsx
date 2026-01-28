import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditArtist() {
  const { artistId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5005/artists/${artistId}`)
      .then((res) => {
        setName(res.data.name);
        setGenre(res.data.genre);
        setCountry(res.data.country || "");
        setImage(res.data.image || "");
      })
      .catch((err) => console.log(err));
  }, [artistId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update artist (without touching image)
      await axios.put(
        `http://localhost:5005/artists/${artistId}`,
        { name, genre, country },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      // Upload new image if selected
      const imageFile = e.target.imageUrl.files[0];

      if (imageFile) {
        const formData = new FormData();
        formData.append("imageUrl", imageFile);

        await axios.post(
          `http://localhost:5005/artists/${artistId}/upload-image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      }

      navigate("/admin/artists");
    } catch (err) {
      console.log(err);
      alert("Error updating artist");
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Edit Artist</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label className="admin-label">Name</label>
        <input
          className="admin-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="admin-label">Genre</label>
        <input
          className="admin-input"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <label className="admin-label">Country</label>
        <input
          className="admin-input"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        {image && (
          <div className="cover-preview-box">
            <img
              src={image}
              alt="Current artist"
              className="cover-preview"
            />
          </div>
        )}

        <label className="admin-label">Upload New Image</label>
        <input
          className="admin-input"
          type="file"
          name="imageUrl"
          accept="image/*"
        />

        <button className="admin-btn save">Save Changes</button>
      </form>
    </div>
  );
}

export default EditArtist;


