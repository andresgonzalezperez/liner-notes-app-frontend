import { Link } from "react-router-dom";

function AlbumCard({ album }) {
  return (
    <Link to={`/albums/${album._id}`} className="album-card">
      <img src={album.cover} alt={album.title} className="album-cover" />
      <h4 className="album-title">{album.title}</h4>
      <p className="album-artist">{album.artist?.name}</p>
    </Link>
  );
}

export default AlbumCard;


