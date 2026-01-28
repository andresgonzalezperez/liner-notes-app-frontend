import { Link } from "react-router-dom";
import gollum404 from "../assets/404Page-Golum.png";

function NotFound() {
  return (
    <div className="page-container">
      <div className="not-found">
        <h2>404 - Page Not Found</h2>
        <img
          src={gollum404}
          alt="404 Gollum"
          className="not-found-image"
        />

        <p>The page you’re looking for doesn’t exist.</p>

        <p className="not-found-link">
          <Link to="/">Click here to go back home.</Link>
        </p>
      </div>
    </div>
  );
}

export default NotFound;

