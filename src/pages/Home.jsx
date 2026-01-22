import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";

function Home() {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5005/albums")
      .then((res) => setAlbums(res.data))
      .catch((err) => console.log(err));

    axios.get("http://localhost:5005/artists")
      .then((res) => setArtists(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-page">
      <Carousel
        title="Featured Albums"
        items={albums}
        renderItem={(album) => (
          <AlbumCard key={album._id} album={album} />
        )}
      />

      <Carousel
        title="Artists"
        items={artists}
        renderItem={(artist) => (
          <ArtistCard key={artist._id} artist={artist} />
        )}
      />
    </div>
  );
}

export default Home;
