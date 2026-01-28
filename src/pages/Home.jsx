import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";
import { API_URL } from "../../config/config";

function Home() {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}albums`)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${API_URL}/artists`)
      .then((res) => setArtists(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-container">
      <div className="home-page">
        <h1 className="home-title">
          Welcome to Linner Notes, a global social network for music discussion
          and discovery. Use it as a diary to record and share your opinion
          about music, or simply to keep track of your favorite artists' latest
          releases.{" "}
        </h1>
        <div className="carousel-section">
          <Carousel
            title="Check Out These Records"
            items={albums}
            renderItem={(album) => <AlbumCard key={album._id} album={album} />}
          />
        </div>
        <Link to="/albums" className="carousel-button">
          All Albums
        </Link>

        <div className="carousel-section">
          <Carousel
            title="What An Artist!"
            items={artists}
            renderItem={(artist) => (
              <ArtistCard key={artist._id} artist={artist} />
            )}
          />
        </div>
        <Link to="/artists" className="carousel-button">
          All Artists
        </Link>
      </div>
    </div>
  );
}

export default Home;
