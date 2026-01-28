import { useRef, useEffect } from "react";

function Carousel({ title, items, renderItem }) {
  const containerRef = useRef(null);

  // Duplicate items for infinite effect
  const infiniteItems = [...items, ...items, ...items];

  // Scroll snapping fix on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Start in the middle block
    const middle = container.scrollWidth / 3;
    container.scrollLeft = middle;
  }, [items]);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = container.firstChild?.offsetWidth || 200;
    const scrollAmount = cardWidth * 2.5;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Infinite scroll loop
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth;
    const third = maxScroll / 3;

    if (container.scrollLeft < third / 2) {
      container.scrollLeft += third;
    } else if (container.scrollLeft > third * 1.5) {
      container.scrollLeft -= third;
    }
  };

  return (
    <div className="carousel-section">
      <h2 className="carousel-title">{title}</h2>

      <div className="carousel-wrapper">
        <button className="carousel-arrow left" onClick={() => scroll("left")}>
          ❮
        </button>

        <div
          className="carousel-container"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {infiniteItems.map((item, index) => (
            <div key={index} className="carousel-item">
              {renderItem(item)}
            </div>
          ))}
        </div>

        <button className="carousel-arrow right" onClick={() => scroll("right")}>
          ❯
        </button>
      </div>
    </div>
  );
}

export default Carousel;


