import { useEffect, useState } from "react";
import "./CardTv.css";
import { FaStar } from "react-icons/fa";
import tmdbApi from "../../api/api";
import { FaAngleDoubleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const CardsTV = ({ title, category, quantity, selectedGenre, sortOption }) => {
  const [apiData, setApiData] = useState([]);
  const [visibleRows, setVisibleRows] = useState(1); // State to track visible rows
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          selectedGenre === "all"
            ? await tmdbApi.getTvsByCategory(
                category ? category : "airing_today"
              )
            : await tmdbApi.getTvsByGenre(selectedGenre);

        // Sắp xếp dữ liệu theo sortOption
        const sortedData = [...response.results].sort((a, b) => {
          switch (sortOption) {
            case "popularity.desc":
              return b.popularity - a.popularity;
            case "popularity.asc":
              return a.popularity - b.popularity;
            case "original_title.asc":
              return a.name.localeCompare(b.name);
            case "original_title.desc":
              return b.name.localeCompare(a.name);
            case "first_air_date.asc":
              return new Date(a.first_air_date) - new Date(b.first_air_date);
            case "first_air_date.desc":
              return new Date(b.first_air_date) - new Date(a.first_air_date);
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
    <div className="tvCard">
      <h2>
        {title ? title : "Airing Today"}{" "}
        <Link
          to={`/allTvShow?title=${title}&category=${category}&quantity=15`}
          className="see-all"
        >
          See all
        </Link>
      </h2>
      <div className="tv-list">
        {apiData.slice(0, visibleRows * quantity).map((card, index) => (
          <Link to={`/tvDetail/${card.id}`} className="cardTV" key={index}>
            <div className="tv-image">
              <img
                className="tv-img"
                src={"https://image.tmdb.org/t/p/w500/" + card.poster_path}
                alt=""
              />
            </div>
            <div className="tv-info">
              <p className="tv-title">{card.name}</p>
              <div className="tv-sub-info">
                <p className="tv-year">{card.first_air_date}</p>
                <p className="tv-rating">
                  {card.vote_average.toFixed(1)}
                  <FaStar className="icon-star" />
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {apiData.length > visibleRows * 6 && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
          <FaAngleDoubleDown className="icon-more" />
        </button>
      )}
    </div>
  );
};

export default CardsTV;
