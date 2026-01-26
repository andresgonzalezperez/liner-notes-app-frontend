import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditAlbum() {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [tracklist, setTracklist] = useState([]);
  const [currentCover, setCurrentCover] = useState("");

  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/artists")
      .then((res) => setArtists(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:5005/albums/${albumId}`)
      .then((res) => {
        const a = res.data;
        setTitle(a.title);
        setArtist(a.artist._id);
        setYear(a.year);
        setGenre(a.genre);
        setTracklist(a.tracklist);
        setCurrentCover(a.cover); // store current cover
      })
      .catch((err) => console.log(err));
  }, [albumId]);

  const handleTrackChange = (index, value) => {
    const updated = [...tracklist];
    updated[index] = value;
    setTracklist(updated);
  };

  const addTrack = () => {
    setTracklist([...tracklist, ""]);
  };

  const removeTrack = (index) => {
    setTracklist(tracklist.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!artist) {
      alert("Please select an artist");
      return;
    }

    try {
      // 1) Update album WITHOUT touching the cover
      await axios.put(
        `http://localhost:5005/albums/${albumId}`,
        {
          title,
          artist,
          year: Number(year),
          genre,
          tracklist,
        },
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
          `http://localhost:5005/albums/${albumId}/upload-cover`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      }

      // 3) Redirect
      navigate("/admin/albums");

    } catch (err) {
      console.log(err);
      alert("Error updating album");
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Edit Album</h2>

      <input
        className="admin-input"
        placeholder="Album Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="admin-input"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      >
        <option value="">Select Artist</option>
        {artists.map((a) => (
          <option key={a._id} value={a._id}>
            {a.name}
          </option>
        ))}
      </select>

      <input
        className="admin-input"
        placeholder="Year"
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      {/* Show current cover */}
      {currentCover && (
        <img
          src={currentCover}
          alt="Current cover"
          className="album-edit-cover-preview"
        />
      )}

      {/* File input for Cloudinary */}
      <input
        className="admin-input"
        type="file"
        name="imageUrl"
        accept="image/*"
      />

      <input
        className="admin-input"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <h4>Tracklist</h4>
      {tracklist.map((track, index) => (
        <div key={index} className="track-row">
          <input
            className="admin-input"
            placeholder={`Track ${index + 1}`}
            value={track}
            onChange={(e) => handleTrackChange(index, e.target.value)}
          />
          <button
            type="button"
            className="admin-delete small"
            onClick={() => removeTrack(index)}
          >
            X
          </button>
        </div>
      ))}

      <button type="button" className="admin-button" onClick={addTrack}>
        + Add Track
      </button>

      <button className="admin-button">Save Changes</button>
    </form>
  );
}

export default EditAlbum;
