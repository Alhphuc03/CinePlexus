import "./Credits.css";
import img_avt_default from "../../assets/avatar-default.png";
import { useEffect, useRef, useState } from "react";
import tmdbApi from "../../api/api";

// eslint-disable-next-line react/prop-types
const Credits = ({ cate, id }) => {
  const [creditData, setCreditData] = useState([]);
  const containerRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    containerRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tmdbApi.getCredits(cate, id);
        setCreditData(response.cast);

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
      <div className="credit-movies-container">
        {creditData.length > 0 ? (
          creditData.map((cast, index) => (
            <div key={index} className="card-credit">
              {cast.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  alt={cast.original_title}
                  className="img-credit"
                />
              ) : (
                <div className="img-placeholder">
                  <img src={img_avt_default} alt="" className="img-credit" />
                </div>
              )}
              <div className="info-credit">
                <p className="title-credit">{cast.original_name}</p>
                <p className="release-credit">Popularity: {cast.popularity}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No similar movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Credits;
