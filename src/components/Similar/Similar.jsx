import { useEffect, useRef, useState } from "react";

import img_movie_default from "../../assets/img-movie-defaultt.png";
import "./Similar.css";
import { Link } from "react-router-dom";
import tmdbApi from "../../api/api";

// eslint-disable-next-line react/prop-types
const Similar = ({ cate, id }) => {
  const [similarData, setSimilarData] = useState([]);
  const containerRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    containerRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tmdbApi.getSimilar(cate, id);
        // Giới hạn số lượng phim tối đa là 6
        setSimilarData(response.results);

        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    const currentRef = containerRef.current;
    currentRef.addEventListener("wheel", handleWheel);

    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, [cate, id]);

  return (
    <div className="horizontal-scroll" ref={containerRef}>
      <div className="similar-movies-container">
        {similarData.length > 0 ? (
          similarData.map((result, index) => (
            <Link
              to={`/movieDetail/${result.id}`}
              className="card-similar"
              key={index}
            >
              {result.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                  alt={result.original_title}
                  className="img-similar"
                />
              ) : (
                <div className="img-placeholder">
                  <img src={img_movie_default} alt="" className="img-similar" />
                </div>
              )}
              <div className="info-similar">
                <p className="title-similar">
                  {" "}
                  {result.original_title ? result.original_title : result.name}
                </p>
                <p className="release-similar">
                  {result.release_date
                    ? result.release_date
                    : result.first_air_date}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>No similar found.</p>
        )}
      </div>
    </div>
  );
};

export default Similar;
