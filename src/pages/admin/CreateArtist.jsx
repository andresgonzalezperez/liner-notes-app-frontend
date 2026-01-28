import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config/config";

function CreateArtist() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create artist WITHOUT image
      const createRes = await axios.post(
        `${API_URL}/artists`,
        { name, genre, country },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const createdArtist = createRes.data;

      // Upload image to Cloudinary
      const imageFile = e.target.imageUrl.files[0];

      if (imageFile) {
        const formData = new FormData();
        formData.append("imageUrl", imageFile);

        await axios.post(
          `${API_URL}/artists/${createdArtist._id}/upload-image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      }

      // Redirect
      navigate("/admin/artists");

    } catch (err) {
      console.log(err);
      alert("Error creating artist");
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Create Artist</h2>

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

      {/* File input for Cloudinary */}
      <input
        className="admin-input"
        type="file"
        name="imageUrl"
        accept="image/*"
      />

      <button className="admin-button">Create</button>
    </form>
  );
}

export default CreateArtist;

