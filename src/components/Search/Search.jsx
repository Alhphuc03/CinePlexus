import { useEffect, useRef, useState } from "react";
import tmdbApi from "../../api/api";
import "./Search.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Search = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose(); // Gọi hàm đóng khi nhấp ra ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const handleSearch = async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const data = await tmdbApi.searchMovies(query);
        setResults(data.results);
      } catch (error) {
        setError("An error occurred while fetching the data.");
        console.error("Error fetching the movies", error);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [query]); // Tìm kiếm khi query thay đổi

  return (
    <div className="search-overlay">
      <div className="search" ref={searchRef}>
        <div className="search-form">
          <input
            type="text"
            placeholder="Enter keywords"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {query && (
          <div className="search-results">
            {results.length === 0 && !loading && !error && (
              <p className="error-message">No results found</p>
            )}
            {results.map((movie) => (
              <Link
                to={`/movieDetail/${movie.id}`}
                key={movie.id}
                className="movie-card"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "https://via.placeholder.com/200x300"
                  }
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
