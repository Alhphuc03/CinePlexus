import { useEffect, useState } from "react";
import loadingimg from "../../../assets/Animation - 1720970751731.gif";
import Navbar from "../../../components/Navbar/Navbar";
import icon_play from "../../../assets/icon-play.png";
import "./MovieDetail.css";
import { Link, useParams } from "react-router-dom";
import tmdbApi from "../../../api/api";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { MdBookmarkAdd } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { GiWorld } from "react-icons/gi";
import ReviewItem from "../../../components/ReviewsList/ReviewList";
import { IoMdTime } from "react-icons/io";
import Similar from "../../../components/Similar/Similar";
import Credits from "../../../components/Credits/Credits";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieDetail, setMovieDetail] = useState({});
  const [reviewMovieDetail, setReviewMovieDetail] = useState([]);
  const { id } = useParams();
  const [currentReviewsIndex, setCurrentReviewsIndex] = useState(0);
  const [reviewsPerPage, setReviewsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchList, setIsWatchList] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
      if (window.innerWidth < 500) {
        setReviewsPerPage(1);
      } else if (window.innerWidth < 800) {
        setReviewsPerPage(2);
      } else {
        setReviewsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const accountID = localStorage.getItem("accountID");
        const response = await tmdbApi.getMovieDetails(id);
        const responseReview = await tmdbApi.getReviewDetails("movie", id);
        setMovieDetail(response);
        setReviewMovieDetail(responseReview.results);

        const favoriteMovies = await tmdbApi.getFavoriteMovie(
          "movie",
          accountID
        );
        const isMovieFavorite = favoriteMovies.results.some(
          (movie) => movie.id === response.id
        );
        setIsFavorite(isMovieFavorite);

        const watchListMovies = await tmdbApi.getWatchListMovieW(
          accountID,
          "movie"
        );
        const isWatchList = watchListMovies.results.some(
          (movie) => movie.id === response.id
        );
        setIsWatchList(isWatchList);

        const ratingtMovies = await tmdbApi.getRatedMovie("movie", accountID);
        const isRating = ratingtMovies.results.some(
          (movie) => movie.id === response.id
        );
        setIsRating(isRating);

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const page = Math.ceil((currentReviewsIndex + 1) / reviewsPerPage);
    setCurrentPage(page);
  }, [currentReviewsIndex]);

  const handleNextReviews = () => {
    setCurrentReviewsIndex((prevIndex) => prevIndex + reviewsPerPage);
  };

  const handlePrevReviews = () => {
    setCurrentReviewsIndex((prevIndex) => prevIndex - reviewsPerPage);
  };

  const totalPages = Math.ceil(reviewMovieDetail.length / reviewsPerPage);

  const renderPageIndicators = () => {
    const pageIndicators = [];
    const totalIndicators = Math.min(totalPages, 4); // Giới hạn số lượng gạch hiển thị tối đa là 4

    for (let i = 1; i <= totalIndicators; i++) {
      const isActive = i === currentPage ? "active" : "";
      pageIndicators.push(
        <div
          key={i}
          className={`page-indicator ${isActive}`}
          onClick={() => setCurrentReviewsIndex((i - 1) * reviewsPerPage)}
        ></div>
      );
    }

    if (totalPages > 4) {
      pageIndicators.splice(2, 0, <span key="dots">...</span>);
    }

    return pageIndicators;
  };

  const handleFavoriteClick = async () => {
    const accountID = localStorage.getItem("accountID");

    try {
      await tmdbApi.postFavoriteMovie(accountID, "movie", id, !isFavorite);
      setIsFavorite((prev) => !prev);
      toast.success(
        isFavorite ? "Removed from favorites!" : "Added to favorites!"
      );
    } catch (error) {
      console.error("Error adding to favorite:", error);
      toast.error("Failed to add to favorites.");
    }
  };

  const handleWatchListClick = async () => {
    const accountID = localStorage.getItem("accountID");

    try {
      await tmdbApi.postWatchListMovie(accountID, "movie", id, !isWatchList);
      setIsWatchList((prev) => !prev);
      toast.success(
        isWatchList ? "Removed from watch list!" : "Added to watch list!"
      );
    } catch (error) {
      console.error("Error adding to watch list:", error);
      toast.error("Failed to add to watch list.");
    }
  };

  const handleRatingClick = () => {
    setIsRatingModalOpen(true);
  };

  const handleRatingSubmit = async () => {
    try {
      await tmdbApi.addRating("movie", id, ratingValue);
      setIsRating((prev) => !prev);
      setIsRatingModalOpen(false);
      toast.success("Rating submitted successfully!");
    } catch (error) {
      console.error("Error adding rating:", error);
      toast.error("Failed to submit rating.");
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <ToastContainer />
      {isLoading ? (
        <div className="loading-container">
          <img src={loadingimg} alt="Loading..." className="loading-gif" />
        </div>
      ) : (
        <div className="movie-detail">
          <div className="movie-poster">
            <img
              src={
                "https://image.tmdb.org/t/p/original/" +
                (isMobile ? movieDetail.poster_path : movieDetail.backdrop_path)
              }
              alt="movie-backdrop"
              className="movie-backdrop"
            />
            <Link to={`/player/movie/${movieDetail.id}`} key={movieDetail.id}>
              <img src={icon_play} className="icon-play" alt="" />
            </Link>
            <div className="movie-title">
              <h2>{movieDetail.title}</h2>
              <span>{movieDetail.tagline}</span>
            </div>
            <div className="movie-action">
              <Link
                to={`/watchMovie/${movieDetail.id}/${movieDetail.original_title}`}
                key={movieDetail.id}
              >
                <button className="btn-play-movie">
                  <FaPlay className="icon-play-movie" />
                  Play Now
                </button>
              </Link>
              <div className="icon-action-list">
                <div className="icon-action" onClick={handleFavoriteClick}>
                  <FaHeartCirclePlus
                    style={{ color: isFavorite ? "red" : "gray" }}
                  />
                </div>
                <div className="icon-action" onClick={handleWatchListClick}>
                  <MdBookmarkAdd
                    style={{ color: isWatchList ? "red" : "gray" }}
                  />
                </div>
                <div className="icon-action" onClick={handleRatingClick}>
                  <FaStar style={{ color: isRating ? "yellow" : "gray" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="movie-details-container">
            <div className="movie-details-left">
              <div className="overview">
                <h3>Overview</h3>
                <span className="description">{movieDetail.overview}</span>
              </div>
              <div className="reviews">
                <h3>Reviews</h3>
                <div className="review-lists">
                  {reviewMovieDetail
                    .slice(
                      currentReviewsIndex,
                      currentReviewsIndex + reviewsPerPage
                    )
                    .map((result, index) => (
                      <ReviewItem
                        key={index}
                        author={result.author}
                        content={result.content}
                        avatarPath={result.author_details.avatar_path}
                        rating={result.author_details.rating}
                      />
                    ))}
                </div>
                <div className="review-navigation">
                  <button
                    onClick={handlePrevReviews}
                    disabled={currentReviewsIndex === 0}
                  >
                    <GrLinkPrevious />
                  </button>
                  <div className="page-indicators">
                    {renderPageIndicators()}
                  </div>
                  <button
                    onClick={handleNextReviews}
                    disabled={
                      currentReviewsIndex + reviewsPerPage >=
                      reviewMovieDetail.length
                    }
                  >
                    <GrLinkNext />
                  </button>
                </div>
              </div>
            </div>
            <div className="movie-details-right">
              <div className="movie-runtime">
                <h3>
                  <IoMdTime />
                  Time
                </h3>
                <span>{movieDetail.runtime} Mins</span>
              </div>
              <div className="movie-release">
                <h3>
                  <FaRegCalendarAlt />
                  Release Date
                </h3>
                <span>{movieDetail.release_date}</span>
              </div>
              <div className="movie-genre">
                <h3>
                  <BiCategory />
                  Genres
                </h3>
                {movieDetail.genres.map((genre, index) => (
                  <button className="btn-genre" key={index}>
                    {genre.name}
                  </button>
                ))}
              </div>
              <div className="movie-country">
                <h3>
                  <GiWorld />
                  Nations
                </h3>
                {movieDetail.production_countries.map((country, index) => (
                  <button className="btn-country" key={index}>
                    {country.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="movie-credits">
            <h3>Credits</h3>
            <Credits cate="movie" id={movieDetail.id} />
          </div>
          <div className="movie-similar">
            <h3>Similar Movies</h3>
            <Similar cate="movie" id={movieDetail.id} />
          </div>
          {isRatingModalOpen && (
            <div className="rating-modal">
              <div className="rating-content">
                <h3>Rating</h3>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`rating-star ${
                        ratingValue >= star ? "filled" : ""
                      }`}
                      onClick={() => setRatingValue(star)}
                    />
                  ))}
                </div>
                <button onClick={handleRatingSubmit}>Submit Rating</button>
                <button
                  className="close"
                  onClick={() => setIsRatingModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
