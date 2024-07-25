import { Link } from "react-router-dom";
import "./CardCarousel.css";
import { useEffect, useRef, useState } from "react";
import tmdbApi from "../../api/api";
// eslint-disable-next-line react/prop-types
const CardCarousel = ({ onCardFocus }) => {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tmdbApi.getMoviesByCategory("now_playing");
        setApiData(response.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    const currentRef = cardsRef.current;
    currentRef.addEventListener("wheel", handleWheel);

    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % apiData.length);
    }, 3000);

    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
      clearInterval(interval);
    };
  }, [apiData.length]);

  useEffect(() => {
    if (cardsRef.current && apiData.length > 0) {
      const cardWidth = cardsRef.current.children[currentCardIndex].offsetWidth;
      cardsRef.current.scrollLeft = currentCardIndex * cardWidth;

      onCardFocus({
        imageURL: apiData[currentCardIndex].backdrop_path,
        overview: apiData[currentCardIndex].overview,
        original_title: apiData[currentCardIndex].original_title

      });
    }
  }, [currentCardIndex, apiData, onCardFocus]);

  return (
    <div className="card-carousel">
      <h2>Popular on CinePlexus</h2>
      <div className="card-list-carousel" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link
            to={`/player/${card.id}`}
            className="card-carousel w-96"
            key={index}
          >
            <div className="card-image-carousel">
              <img
                className="img-card"
                src={"https://image.tmdb.org/t/p/w500/" + card.backdrop_path}
                alt=""
              />
            </div>
            <div className="card-info-carousel">
              <p>{card.original_title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
