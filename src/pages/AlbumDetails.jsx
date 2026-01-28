import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import RatingRings from "../components/RatingRings";
import ringIcon from "../assets/ring.png";
import { API_URL } from "../../config/config";

function AlbumDetails() {
  const { albumId } = useParams();
  const { isLoggedIn, isAdmin, user, authenticateUser } =
    useContext(AuthContext);

  const [album, setAlbum] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_URL}/albums/${albumId}`)
      .then((res) => setAlbum(res.data))
      .catch((err) => console.log(err));
  }, [albumId]);

  const isFavorite = user?.favoriteAlbums?.some((a) => a._id === albumId);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(
          `${API_URL}/users/${user._id}/favorites/albums/${albumId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          },
        );
      } else {
        await axios.post(
          `${API_URL}/users/${user._id}/favorites/albums/${albumId}`,
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
        `${API_URL}/albums/${albumId}/reviews`,
        { comment, rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      )
      .then((res) => {
        setAlbum(res.data);
        setComment("");
        setRating(0);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteReview = (reviewId) => {
    axios
      .delete(`${API_URL}/albums/${albumId}/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
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
    <div className="details-page">
      {/* TOP SECTION */}
      <div className="details-top">
        <img src={album.cover} alt={album.title} className="details-cover" />

        <div className="details-info">
          <h1>{album.title}</h1>

          <Link
            to={`/artists/${album.artist?._id}`}
            className="details-artist-link"
          >
            {album.artist?.name}
          </Link>

          {isLoggedIn && (
            <button className="favorite-button" onClick={toggleFavorite}>
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </button>
          )}

          <p className="details-description">{album.description}</p>
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
        {album.reviews?.map((rev) => (
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
                  <img key={i} src={ringIcon} alt="ring" className="rating-ring" />
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

export default AlbumDetails;
