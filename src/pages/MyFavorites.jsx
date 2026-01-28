import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";

function MyFavorites() {
  const { user } = useContext(AuthContext);

  if (!user) return <p className="loading">Loading favorites...</p>;

  return (
    <div className="page-container">
      <div className="favorites-page">
        <h2 className="carousel-title">My Favorites Tracks</h2>

        {/* FAVORITE ALBUMS */}
        <section className="favorites-section">
          <h3 className="section-title">Favorite Albums</h3>

          {user.favoriteAlbums?.length === 0 && (
            <p className="empty-message">No favorite albums yet.</p>
          )}

          <div className="grid-container">
            {user.favoriteAlbums?.map((album) => (
              <AlbumCard key={album._id} album={album} />
            ))}
          </div>
        </section>

        {/* FAVORITE ARTISTS */}
        <section className="favorites-section">
          <h3 className="section-title">Favorite Artists</h3>

          {user.favoriteArtists?.length === 0 && (
            <p className="empty-message">No favorite artists yet.</p>
          )}

          <div className="grid-container">
            {user.favoriteArtists?.map((artist) => (
              <ArtistCard key={artist._id} artist={artist} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyFavorites;

