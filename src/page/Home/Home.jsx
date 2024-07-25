import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
// import hero_banner from "../../assets/hero_banner.jpg";
// import hero_title from "../../assets/hero_title.png";
import play_icons from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import Footer from "../../components/Footer/Footer";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import Cards from "../../components/CardMovie/Card";
import loading from "../../assets/Animation - 1720970751731.gif";
import { useEffect, useState } from "react";
import CardsTV from "../../components/CardTV/CardTv";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [focusedCardImage, setFocusedCardImage] = useState(""); // State để lưu URL ảnh của card được focus
  const [focusedCardOverview, setFocusedCardOverview] = useState(""); // State để lưu overview của card được focus
  const [focusCarrdTitle, setFocusCardTitle] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  const handleCardFocus = ({ imageURL, overview, original_title }) => {
    setFocusedCardImage(imageURL);
    setFocusedCardOverview(overview);
    setFocusCardTitle(original_title);
  };

  useEffect(() => {
    const preloadImage = (url) => {
      const img = new Image();
      img.src = url;
    };

    preloadImage(`https://image.tmdb.org/t/p/original/${focusedCardImage}`);
  }, [focusedCardImage]);

  return (
    <div className="home">
      <Navbar />
      {isLoading ? (
        <div className="loading-container">
          <img src={loading} alt="Loading..." className="loading-gif" />
        </div>
      ) : (
        <>
          <div className="hero">
            <img
              src={"https://image.tmdb.org/t/p/original/" + focusedCardImage}
              alt=""
              className="banner-img"
            />
            <div className="hero-caption">
              {/* <img src={hero_title} alt="" className="caption-img" /> */}
              <p className="title-movie">{focusCarrdTitle}</p>
              <p className="overview-movie">{focusedCardOverview}</p>
              <div className="hero-btn">
                <button className="btn">
                  <img src={play_icons} alt="" />
                  Play
                </button>
                <button className="btn dark-btn">
                  <img src={info_icon} alt="" />
                  More Info
                </button>
              </div>
              <CardCarousel onCardFocus={handleCardFocus} />
            </div>
          </div>
          <div className="more-cards">
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
            <CardsTV
              title={"Popular TV"}
              category={"popular"}
              quantity={6}
              selectedGenre="all"
            />
            <CardsTV
              title={"Top Rated TV"}
              category={"top_rated"}
              quantity={6}
              selectedGenre="all"
            />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
