import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

const Player = () => {
  const { cate,id } = useParams(); // Đảm bảo lấy id đúng cách
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzQ0YzQ2MWI0ZTlhNTczMDMxMWIxYmFjZGM5YTMzNyIsInN1YiI6IjYzZjg3ZGUzNjhiMWVhMDBkYzA1OWFhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Obip8bKSRPMmVcEfIA8kkZScWvsR_5TJ_Ps_3mmqBSs",
    },
  };

  useEffect(() => {
    if (id) {
      fetch(`https://api.themoviedb.org/3/${cate}/${id}/videos`, options)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            setApiData(data.results[0]);
          }
        })
        .catch((err) => console.error("Error fetching video data:", err));
    }
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => {
          navigate(-1); // Điều hướng quay lại 2 trang trước
        }}
      />
      {apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        />
      ) : (
        <p>Loading...</p>
      )}
      <div className="player-info">
        {apiData.published_at && <p>{apiData.published_at.slice(0, 10)}</p>}
        {apiData.name && <p>{apiData.name}</p>}
        {apiData.typeof && <p>{apiData.typeof}</p>}
      </div>
    </div>
  );
};

export default Player;
