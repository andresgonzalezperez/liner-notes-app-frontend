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
      // 1) Update artist WITHOUT touching the image
      await axios.put(
        `http://localhost:5005/artists/${artistId}`,
        { name, genre, country },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      // 2) If a new image was selected → upload to Cloudinary
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

      // 3) Redirect
      navigate("/admin/artists");

    } catch (err) {
      console.log(err);
      alert("Error updating artist");
    }
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
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />

      {/* Show current image */}
      {image && (
        <img
          src={image}
          alt="Current artist"
          className="artist-edit-image-preview"
        />
      )}

      {/* File input for Cloudinary */}
      <input
        className="admin-input"
        type="file"
        name="imageUrl"
        accept="image/*"
      />

      <button className="admin-button">Save Changes</button>
    </form>
  );
}

export default EditArtist;

