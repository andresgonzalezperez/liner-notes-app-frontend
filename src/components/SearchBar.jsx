import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { API_URL } from "../../config/config";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ artists: [], albums: [] });

  const location = useLocation();
  useEffect(() => {
    setQuery("");
    setResults({ artists: [], albums: [] });
  }, [location.pathname]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults({ artists: [], albums: [] });
      return;
    }

    const res = await axios.get(`${API_URL}/search?q=${value}`);
    setResults(res.data);
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Search artists or albums..."
        value={query}
        onChange={handleSearch}
        className="searchbar-input"
      />

      {query && (
        <div className="searchbar-results">
          {results.artists.length === 0 && results.albums.length === 0 && (
            <p className="searchbar-empty">No results found</p>
          )}

          {/* ARTISTS */}
          {results.artists.map((artist) => (
            <Link
              key={artist._id}
              to={`/artists/${artist._id}`}
              className="searchbar-item"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="searchbar-thumb"
              />
              <span>{artist.name}</span>
            </Link>
          ))}

          {/* ALBUMS */}
          {results.albums.map((album) => (
            <Link
              key={album._id}
              to={`/albums/${album._id}`}
              className="searchbar-item"
            >
              <img
                src={album.cover}
                alt={album.title}
                className="searchbar-thumb"
              />
              <span>{album.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;


