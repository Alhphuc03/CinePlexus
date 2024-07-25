import { Link } from "react-router-dom";
import "./Card.css";
import { useEffect, useState } from "react";
import tmdbApi from "../../api/api";
import { FaStar } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";
// eslint-disable-next-line react/prop-types
const Cards = ({ title, category, quantity, selectedGenre, sortOption }) => {
  const [apiData, setApiData] = useState([]);
  const [visibleRows, setVisibleRows] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          selectedGenre === "all"
            ? await tmdbApi.getMoviesByCategory(
                category ? category : "now_playing"
              )
            : await tmdbApi.getMoviesByGenre(selectedGenre);

        // Sắp xếp dữ liệu theo sortOption
        const sortedData = [...response.results].sort((a, b) => {
          switch (sortOption) {
            case "popularity.desc":
              return b.popularity - a.popularity;
            case "popularity.asc":
              return a.popularity - b.popularity;
            case "original_title.asc":
              return a.title.localeCompare(b.title);
            case "original_title.desc":
              return b.title.localeCompare(a.title);
            case "release_date.asc":
              return new Date(a.release_date) - new Date(b.release_date);
            case "release_date.desc":
              return new Date(b.release_date) - new Date(a.release_date);
            default:
              return 0;
          }
        });

        setApiData(sortedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [category, selectedGenre, sortOption]);

  const handleLoadMore = () => {
    setVisibleRows((prev) => prev + 2);
  };

  return (
    <div className="cards">
      <h2>
        {title ? title : "Now Playing"}{" "}
        <Link
          to={`/allMovies?title=${title}&category=${category}&quantity=15`}
          className="see-all"
        >
          See all
        </Link>
      </h2>
      <div className="card-list">
        {apiData.slice(0, visibleRows * quantity).map((card, index) => (
          <Link to={`/movieDetail/${card.id}`} className="card" key={index}>
            <div className="card-image">
              <img
                className="card-img"
                src={"https://image.tmdb.org/t/p/w500/" + card.poster_path}
                alt=""
              />
            </div>
            <div className="card-info">
              <p className="card-title">{card.title}</p>
              <div className="card-sub-info">
                <p className="card-year">{card.release_date}</p>
                <p className="card-rating">
                  {card.vote_average.toFixed(1)}
                  <FaStar className="icon-star" />
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {apiData.length > visibleRows * quantity && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
          <FaAngleDoubleDown className="icon-more" />
        </button>
      )}
    </div>
  );
};

export default Cards;
