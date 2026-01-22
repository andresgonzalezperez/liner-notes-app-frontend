import { useEffect, useState } from "react";
import axios from "axios";
import AlbumCard from "../components/AlbumCard";

function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5005/albums")
      .then((res) => setAlbums(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="albums-page">
      <h2>All Albums</h2>

      <div className="grid-container">
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </div>
    </div>
  );
}

export default Albums;
