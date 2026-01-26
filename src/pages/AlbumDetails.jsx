import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function AlbumDetails() {
  const { albumId } = useParams();
  const { isLoggedIn, isAdmin, user, authenticateUser } = useContext(AuthContext);

  const [album, setAlbum] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/albums/${albumId}`)
      .then((res) => setAlbum(res.data))
      .catch((err) => console.log(err));
  }, [albumId]);

  // Check if this album is already a favorite
  const isFavorite = user?.favoriteAlbums?.some(a => a._id === albumId);

  // Add/remove album from favorites
  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(
          `http://localhost:5005/users/${user._id}/favorites/albums/${albumId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      } else {
        await axios.post(
          `http://localhost:5005/users/${user._id}/favorites/albums/${albumId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      }

      // Refresh user data
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
        `http://localhost:5005/albums/${albumId}/reviews`,
        { comment, rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((res) => {
        setAlbum(res.data); // full updated album
        setComment("");
        setRating(0);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteReview = (reviewId) => {
    axios
      .delete(
        `http://localhost:5005/albums/${albumId}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => {
        setAlbum((prev) => ({
          ...prev,
          reviews: prev.reviews.filter((r) => r._id !== reviewId),
        }));
      })
      .catch((err) => console.log(err));
  };

  if (!album) return <p className="loading">Loading album...</p>;

  return (
    <div className="album-details">
      <img src={album.cover} alt={album.title} className="album-details-cover" />

      <div className="album-details-info">
        <h2>{album.title}</h2>
        <p className="album-details-artist">{album.artist?.name}</p>

        {/* ⭐ FAVORITE BUTTON */}
        {isLoggedIn && (
          <button className="favorite-button" onClick={toggleFavorite}>
            {isFavorite ? "💔 Remove from Favorites" : "❤️ Add to Favorites"}
          </button>
        )}

        <h3>Reviews</h3>
        <div className="reviews-list">
          {album.reviews?.map((rev) => (
            <div key={rev._id} className="review-item">
              <strong>{rev.user?.username || "Unknown user"}</strong>

              <p className="review-rating">
                {"⭐".repeat(rev.rating)} <span>({rev.rating}/5)</span>
              </p>

              <p>{rev.comment}</p>

              {isAdmin && (
                <button
                  className="review-delete"
                  onClick={() => handleDeleteReview(rev._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        {isLoggedIn && (
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <select
              className="review-rating-select"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={0}>0 ⭐</option>
              <option value={1}>1 ⭐</option>
              <option value={2}>2 ⭐</option>
              <option value={3}>3 ⭐</option>
              <option value={4}>4 ⭐</option>
              <option value={5}>5 ⭐</option>
            </select>

            <textarea
              className="review-input"
              placeholder="Write a review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button className="review-button" type="submit">
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AlbumDetails;



