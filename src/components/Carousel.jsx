function Carousel({ title, items, renderItem }) {
  return (
    <section className="carousel-section">
      <h2 className="carousel-title">{title}</h2>

      <div className="carousel-container">
        {items.map((item) => renderItem(item))}
      </div>
    </section>
  );
}

export default Carousel;

