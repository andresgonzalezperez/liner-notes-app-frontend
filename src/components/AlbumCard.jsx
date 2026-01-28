import { Link } from "react-router-dom";
import defaultCover from "../assets/default-cover.jpg";

function AlbumCard({ album }) {
  return (
    <Link to={`/albums/${album._id}`} className="album-card">
      <div className="card-image-wrapper">
        <img src={album.cover || defaultCover} alt={album.title} className="album-cover" />

        <div className="card-overlay">
          <p className="card-title">"{album.title}"</p>
          <p className="card-subtitle">{album.artist?.name}</p>
        </div>
      </div>
    </Link>
  );
}

export default AlbumCard;




