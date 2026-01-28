import { Link } from "react-router-dom";
import defaultArtist from "../assets/default-artist.png";

function ArtistCard({ artist }) {
  return (
    <Link to={`/artists/${artist._id}`} className="artist-card">
      <div className="card-image-wrapper">
        <img src={artist.image || defaultArtist} alt={artist.name} className="artist-photo" />
        <div className="card-overlay">
          <p className="card-title">{artist.name}</p>
        </div>
      </div>
    </Link>
  );
}

export default ArtistCard;




