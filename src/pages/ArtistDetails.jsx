import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import RatingRings from "../components/RatingRings";
import ringIcon from "../assets/ring.png";
import { API_URL } from "../../config/config";


function ArtistDetails() {
  const { artistId } = useParams();
  const { isLoggedIn, isAdmin, user, authenticateUser } =
    useContext(AuthContext);

  const [artist, setArtist] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_URL}/artists/${artistId}`)
      .then((res) => setArtist(res.data))
      .catch((err) => console.log(err));
  }, [artistId]);

  const isFavorite = user?.favoriteArtists?.some((a) => a._id === artistId);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(
          `${API_URL}/users/${user._id}/favorites/artists/${artistId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          },
        );
      } else {
        await axios.post(
          `${API_URL}/users/${user._id}/favorites/artists/${artistId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          },
        );
      }

      await authenticateUser();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    axios
      .post(
        `${API_URL}/artists/${artistId}/reviews`,
        { comment, rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      )
      .then((res) => {
        setArtist(res.data);
        setComment("");
        setRating(0);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteReview = (reviewId) => {
    axios
      .delete(`${API_URL}/artists/${artistId}/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then(() => {
        setArtist((prev) => ({
          ...prev,
          reviews: prev.reviews.filter((r) => r._id !== reviewId),
        }));
      })
      .catch((err) => console.log(err));
  };

  if (!artist) return <p className="loading">Loading artist...</p>;

  return (
    <div className="details-page">
      {/* TOP SECTION */}
      <div className="details-top">
        <img src={artist.image} alt={artist.name} className="details-cover" />

        <div className="details-info">
          <h1>{artist.name}</h1>
          <p className="details-genre">{artist.genre}</p>

          {isLoggedIn && (
            <button className="favorite-button" onClick={toggleFavorite}>
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </button>
          )}

          <h3 className="details-subtitle">Discography</h3>
          <ul className="details-discography">
            {artist.albums?.map((album) => (
              <li key={album._id}>
                <Link
                  to={`/albums/${album._id}`}
                  className="details-album-link"
                >
                  {album.title}
                </Link>
              </li>
            ))}
          </ul>

          <p className="details-bio">{artist.bio}</p>
        </div>
      </div>

      {/* REVIEW FORM */}
      {isLoggedIn && (
        <form className="review-form" onSubmit={handleReviewSubmit}>
      <RatingRings rating={rating} onChange={setRating} />
          <textarea
            className="review-input"
            placeholder="Write a review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button className="review-submit" type="submit">
            Submit Review
          </button>
        </form>
      )}

      {/* REVIEWS LIST */}
      <div className="reviews-list">
        {artist.reviews?.map((rev) => (
          <div key={rev._id} className="review-card">
            <img
              className="review-avatar"
              src={rev.user?.avatar}
              alt={rev.user?.username}
            />

            <div>
              <p className="review-user">{rev.user?.username}</p>
              <p className="review-rating">
                {[...Array(rev.rating)].map((_, i) => (
                  <img key={i} src={ringIcon} alt="ring" className="rating-ring active" /> 
                  ))} 
                  <span>({rev.rating}/5)</span>
              </p>
              <p className="review-text">{rev.comment}</p>

              {isAdmin && (
                <button
                  className="review-delete"
                  onClick={() => handleDeleteReview(rev._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtistDetails;
