import { Link } from "react-router-dom";
import defaultCover from "../assets/default-cover.jpg";

function AlbumCard({ album }) {
  return (
    <Link to={`/albums/${album._id}`} className="album-card">
      <img
        src={album.cover || defaultCover}
        alt={album.title}
        className="album-cover"
      />
      <h4 className="album-title">{album.title}</h4>
      <p className="album-artist">{album.artist?.name}</p>
    </Link>
  );
}

export default AlbumCard;



