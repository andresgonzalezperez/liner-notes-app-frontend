import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function MyFavorites() {
  const { user } = useContext(AuthContext);

  if (!user) return <p className="loading">Loading favorites...</p>;

  return (
    <div className="favorites-page">
      <h1>My Favorites</h1>

      {/* FAVORITE ALBUMS */}
      <section className="favorites-section">
        <h2>Favourite Albums</h2>

        {user.favoriteAlbums?.length === 0 && (
          <p>No favorite albums yet.</p>
        )}

        <div className="favorites-grid">
          {user.favoriteAlbums?.map((album) => (
            <Link
              key={album._id}
              to={`/albums/${album._id}`}
              className="favorite-card"
            >
              <img src={album.cover} alt={album.title} />
              <h4>{album.title}</h4>
              <p>{album.artist?.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAVORITE ARTISTS */}
      <section className="favorites-section">
        <h2>Favourite Artists</h2>

        {user.favoriteArtists?.length === 0 && (
          <p>No favorite artists yet.</p>
        )}

        <div className="favorites-grid">
          {user.favoriteArtists?.map((artist) => (
            <Link
              key={artist._id}
              to={`/artists/${artist._id}`}
              className="favorite-card"
            >
              <img src={artist.image} alt={artist.name} />
              <h4>{artist.name}</h4>
              <p>{artist.genre}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MyFavorites;
