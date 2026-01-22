import { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";

function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5005/artists")
      .then((res) => setArtists(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="artists-page">
      <h2>All Artists</h2>

      <div className="grid-container">
        {artists.map((artist) => (
          <ArtistCard key={artist._id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default Artists;
