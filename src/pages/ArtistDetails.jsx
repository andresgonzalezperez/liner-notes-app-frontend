import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AlbumCard from "../components/AlbumCard";

function ArtistDetails() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5005/artists/${artistId}`)
      .then((res) => setArtist(res.data));

    axios.get(`http://localhost:5005/artists/${artistId}/albums`)
      .then((res) => setAlbums(res.data));
  }, [artistId]);

  if (!artist) return <p className="loading">Loading artist...</p>;

  return (
    <div className="artist-details">
      <img src={artist.photo} alt={artist.name} className="artist-details-photo" />

      <div className="artist-details-info">
        <h2>{artist.name}</h2>
        <p className="artist-details-genre">Genre: {artist.genre}</p>
        <p className="artist-details-bio">{artist.bio}</p>

        <h3>Discography</h3>
        <div className="grid-container">
          {albums.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtistDetails;

