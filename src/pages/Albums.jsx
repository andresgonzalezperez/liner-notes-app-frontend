import { useEffect, useState } from "react";
import axios from "axios";
import AlbumCard from "../components/AlbumCard";
import { API_URL } from "../../config/config";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/albums`)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Loading albums...</p>;

  return (
    <div className="page-container">
      <div className="albums-page">
        <h2 className="carousel-title">All Albums</h2>

        <div className="grid-container">
          {albums.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Albums;

