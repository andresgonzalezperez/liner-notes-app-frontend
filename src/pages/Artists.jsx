import { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";
import { API_URL } from "../../config/config";

function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/artists`)
      .then((res) => setArtists(res.data))
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Loading artists...</p>;
  if (error) return <p className="error">Error loading artists</p>;

  return (
    <div className="page-container">
      <div className="artists-page">
        <h2 className="carousel-title">All Artists</h2>

        <div className="grid-container">
          {artists.map((artist) => (
            <ArtistCard key={artist._id} artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Artists;

