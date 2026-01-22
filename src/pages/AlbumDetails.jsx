import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function AlbumDetails() {
  const { albumId } = useParams();
  const { isLoggedIn, user } = useContext(AuthContext);

  const [album, setAlbum] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5005/albums/${albumId}`)
      .then((res) => setAlbum(res.data));

    axios.get(`http://localhost:5005/albums/${albumId}/reviews`)
      .then((res) => setReviews(res.data));
  }, [albumId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    axios.post(
      `http://localhost:5005/albums/${albumId}/reviews`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    )
    .then((res) => {
      setReviews([...reviews, res.data]);
      setComment("");
    });
  };

  if (!album) return <p className="loading">Loading album...</p>;

  return (
    <div className="album-details">
      <img src={album.cover} alt={album.title} className="album-details-cover" />

      <div className="album-details-info">
        <h2>{album.title}</h2>
        <p className="album-details-artist">{album.artist?.name}</p>

        <h3>Reviews</h3>
        <div className="reviews-list">
          {reviews.map((rev) => (
            <div key={rev._id} className="review-item">
              <strong>{rev.user.username}</strong>
              <p>{rev.comment}</p>
            </div>
          ))}
        </div>

        {isLoggedIn && (
          <form className="review-form" onSubmit={handleReviewSubmit}>
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

