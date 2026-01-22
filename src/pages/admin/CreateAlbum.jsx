import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateAlbum() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [cover, setCover] = useState("");
  const [genre, setGenre] = useState("");
  const [tracklist, setTracklist] = useState([""]);

  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/artists")
      .then((res) => setArtists(res.data));
  }, []);

  const handleTrackChange = (index, value) => {
    const updated = [...tracklist];
    updated[index] = value;
    setTracklist(updated);
  };

  const addTrack = () => {
    setTracklist([...tracklist, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5005/albums",
        { title, artist, year, cover, genre, tracklist },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => navigate("/admin/albums"))
      .catch((err) => console.log(err));
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Create Album</h2>

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

      <input
        className="admin-input"
        placeholder="Cover URL"
        value={cover}
        onChange={(e) => setCover(e.target.value)}
      />

      <input
        className="admin-input"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <h4>Tracklist</h4>
      {tracklist.map((track, index) => (
        <input
          key={index}
          className="admin-input"
          placeholder={`Track ${index + 1}`}
          value={track}
          onChange={(e) => handleTrackChange(index, e.target.value)}
        />
      ))}

      <button type="button" className="admin-button" onClick={addTrack}>
        + Add Track
      </button>

      <button className="admin-button">Create Album</button>
    </form>
  );
}

export default CreateAlbum;
