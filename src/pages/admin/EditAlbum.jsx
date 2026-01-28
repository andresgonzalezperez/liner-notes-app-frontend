import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../../config/config";

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
      .get(`${API_URL}/artists`)
      .then((res) => setArtists(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${API_URL}/albums/${albumId}`)
      .then((res) => {
        const a = res.data;
        setTitle(a.title);
        setArtist(a.artist._id);
        setYear(a.year);
        setGenre(a.genre);
        setTracklist(a.tracklist);
        setCurrentCover(a.cover);
      })
      .catch((err) => console.log(err));
  }, [albumId]);

  const handleTrackChange = (index, value) => {
    const updated = [...tracklist];
    updated[index] = value;
    setTracklist(updated);
  };

  const addTrack = () => setTracklist([...tracklist, ""]);
  const removeTrack = (index) =>
    setTracklist(tracklist.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!artist) {
      alert("Please select an artist");
      return;
    }

    try {
      await axios.put(
        `${API_URL}/albums/${albumId}`,
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

      const imageFile = e.target.imageUrl.files[0];

      if (imageFile) {
        const formData = new FormData();
        formData.append("imageUrl", imageFile);

        await axios.post(
          `${API_URL}/albums/${albumId}/upload-cover`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      }

      navigate("/admin/albums");
    } catch (err) {
      console.log(err);
      alert("Error updating album");
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Edit Album</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label className="admin-label">Album Title</label>
        <input
          className="admin-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="admin-label">Artist</label>
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

        <label className="admin-label">Year</label>
        <input
          className="admin-input"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        {currentCover && (
          <div className="cover-preview-box">
            <img
              src={currentCover}
              alt="Current cover"
              className="cover-preview"
            />
          </div>
        )}

        <label className="admin-label">Upload New Cover</label>
        <input className="admin-input" type="file" name="imageUrl" accept="image/*" />

        <label className="admin-label">Genre</label>
        <input
          className="admin-input"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <h3 className="admin-subtitle">Tracklist</h3>

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
              className="admin-btn delete small"
              onClick={() => removeTrack(index)}
            >
              X
            </button>
          </div>
        ))}

        <button type="button" className="admin-btn add" onClick={addTrack}>
          + Add Track
        </button>

        <button className="admin-btn save">Save Changes</button>
      </form>
    </div>
  );
}

export default EditAlbum;
