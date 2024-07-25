import { useEffect, useState } from "react";
import CardsTV from "../../components/CardTV/CardTv";
import Navbar from "./../../components/Navbar/Navbar";
import "./TvShow.css";
import loading from "../../assets/Animation - 1720970751731.gif";
const TvShow = () => {
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
          <CardsTV
            title={"Airing Today"}
            category={"airing_today"}
            quantity={6}
            selectedGenre="all"
          />
          <CardsTV
            title={"On The Air"}
            category={"on_the_air"}
            quantity={6}
            selectedGenre="all"
          />
          <CardsTV
            title={"Popular"}
            category={"popular"}
            quantity={6}
            selectedGenre="all"
          />
          <CardsTV
            title={"Top Rated"}
            category={"top_rated"}
            quantity={6}
            selectedGenre="all"
          />
        </div>
      )}
    </div>
  );
};

export default TvShow;
