import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import loadingimg from "../../assets/Animation - 1720970751731.gif";
import "./WatchMovie.css";
import tmdbApi from "../../api/api";
import { IoArrowBackCircleSharp } from "react-icons/io5";
const WatchMovie = () => {
  const { id, title } = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieDetail, setMovieDetail] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const response = await tmdbApi.getMovieDetail(id);
        setMovieDetail(response);

        // Tìm kiếm phim theo tiêu đề
        const searchResponse = await axios.get(
          `https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(
            title
          )}&limit=100`
        );
        const searchData = searchResponse.data;

        if (searchData.status === "success") {
          const movies = searchData.data.items;
          const movie = movies.find((movie) => movie.origin_name === title);

          if (movie) {
            // Lấy thông tin chi tiết của phim
            const movieDetailsResponse = await axios.get(
              `https://phimapi.com/phim/${movie.slug}`
            );
            const movieDetails = movieDetailsResponse.data;

            const linkm3u8 =
              movieDetails?.episodes?.[0]?.server_data?.[0]?.link_m3u8 || "";
            setVideoUrl(linkm3u8);
          } else {
            setError("Movie not found.");
          }
        } else {
          setError("Error fetching movie search results.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, title]);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={loadingimg} alt="Loading..." className="loading-gif" />
      </div>
    );
  }

  return (
    <div className="watch-movie">
      <img
        src={"https://image.tmdb.org/t/p/original/" + movieDetail.backdrop_path}
        alt="img-movie-backdrop"
        className="img-movie-backdrop"
      />
      <h1>{title}</h1>
      <IoArrowBackCircleSharp
        className="icon-back"
        onClick={() => {
          navigate(-1); // Điều hướng quay lại 2 trang trước
        }}
      />
      {error ? (
        <div className="error"> {error}</div>
      ) : !videoUrl ? (
        <div className="no-movie">No movie available.</div>
      ) : (
        <div className="watch-movie-container">
          <ReactPlayer
            url={videoUrl}
            playing
            controls
            className="react-player"
          />
        </div>
      )}
    </div>
  );
};

export default WatchMovie;
