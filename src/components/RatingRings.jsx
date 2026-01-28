import { useState } from "react";
import ringIcon from "../assets/ring.png";

function RatingRings({ rating, onChange }) {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="rating-rings">
      {[1, 2, 3, 4, 5].map((value) => {
        const isActive = value <= (hoverValue || rating);

        return (
          <img
            key={value}
            src={ringIcon}
            alt="ring"
            className={`rating-ring ${isActive ? "active" : ""}`}
            onClick={() => onChange(value)}
            onMouseEnter={() => setHoverValue(value)}
            onMouseLeave={() => setHoverValue(0)}
          />
        );
      })}
    </div>
  );
}

export default RatingRings;

