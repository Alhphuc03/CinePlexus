import { useEffect, useState } from "react";
import Navbar from "./../../components/Navbar/Navbar";
import loading from "../../assets/Animation - 1720970751731.gif";
import Cards from "../../components/CardMovie/Card";
const Movie = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="flex">
      <Navbar />
      {isLoading ? (
        <div className="loading-container">
          <img src={loading} alt="Loading..." className="loading-gif" />
        </div>
      ) : (
        <div className="more-tv">
          <Cards
            title={"Now Playing Movie"}
            category={"now_playing"}
            quantity={6}
            selectedGenre="all"
          />
          <Cards
            title={"Upcoming Movie"}
            category={"upcoming"}
            quantity={6}
            selectedGenre="all"
          />
          <Cards
            title={"Top Rated Movie"}
            category={"top_rated"}
            quantity={6}
            selectedGenre="all"
          />
          <Cards
            title={"Popular Movie "}
            category={"popular"}
            quantity={6}
            selectedGenre="all"
          />
        </div>
      )}
    </div>
  );
};

export default Movie;
