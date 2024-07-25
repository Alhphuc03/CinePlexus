/* eslint-disable react/prop-types */
import { useState } from "react";
import "./ReviewList.css";
// import { CiStar } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
// eslint-disable-next-line react/prop-types
const ReviewItem = ({ author, content, avatarPath, rating }) => {
  const [expanded, setExpanded] = useState(false);

  const renderStars = () => {
    const rating5 = Math.round(rating / 2);
    const maxStars = 5;
    const stars = [];

    for (let i = 0; i < rating5; i++) {
      stars.push(<IoIosStar key={i} style={{ color: "#FF0000" }} />);
    }

    const emptyStars = maxStars - rating5;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<IoIosStar key={`empty${i}`} style={{ color: "gray" }} />);
    }

    return stars;
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="review-item">
      <div className="author-container">
        {avatarPath ? (
          <img
            src={"https://image.tmdb.org/t/p/w45/" + avatarPath}
            alt="avatar"
            className="avatar"
          />
        ) : (
          <FaCircleUser className="avatar" />
        )}
        <p className="author">{author}</p>
      </div>
      <div className="rating">
        {renderStars()}
        <span>{Math.round(rating / 2)}</span>
      </div>

      <p className={`content ${expanded ? "expanded" : ""}`}>{content}</p>

      {content.length > 150 && (
        <button className="expand-button" onClick={toggleExpand}>
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
};

export default ReviewItem;
