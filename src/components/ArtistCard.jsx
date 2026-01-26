import { Link } from "react-router-dom";
import defaultArtist from "../assets/default-artist.png";

function ArtistCard({ artist }) {
  return (
    <Link to={`/artists/${artist._id}`} className="artist-card">
      <img
        src={artist.image || defaultArtist}
        alt={artist.name}
        className="artist-photo"
      />
      <h4 className="artist-name">{artist.name}</h4>
    </Link>
  );
}

export default ArtistCard;



