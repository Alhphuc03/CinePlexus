import "./Navbar.css";
import bell_icon from "../../assets/bell_icon.svg";
import caret_icon from "../../assets/caret_icon.svg";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoweb from "../../assets/logoweb.png";
import profile_icon from "../../assets/profile_img.png";
import tmdbApi from "../../api/api";
import Search from "../Search/Search";
import search_icon from "../../assets/search_icon.svg";

const Navbar = () => {
  const [profileImage, setProfileImage] = useState("");
  const navRef = useRef();
  const { pathname } = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const sessionId = localStorage.getItem("sessionId");
      if (sessionId) {
        try {
          const accountDetails = await tmdbApi.getAccountDetails(sessionId);
          if (accountDetails.avatar && accountDetails.avatar.tmdb) {
            setProfileImage(
              `https://image.tmdb.org/t/p/w500${accountDetails.avatar.tmdb.avatar_path}`
            );
          } else {
            setProfileImage(profile_icon); // Sử dụng ảnh mặc định nếu không có avatar
          }
        } catch (error) {
          console.error("Error fetching account details:", error);
        }
      }
    };

    fetchAccountDetails();
  }, []);

  // Kiểm tra nếu ảnh là ảnh mặc định
  // eslint-disable-next-line no-unused-vars
  const isDefaultProfileImage = profileImage === profile_icon;

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logoweb} alt="" />
        </Link>
        <ul>
          <li>
            <Link to="/" className={pathname === "/" ? "active" : ""}>
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/tvshow"
              className={pathname === "/tvshow" ? "active" : ""}
            >
              TV SHOW
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              className={pathname === "/movies" ? "active" : ""}
            >
              MOVIES
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={bell_icon} alt="" className="icons" />
        <img
          src={search_icon} // Add search icon
          alt="Search"
          className="icons"
          onClick={() => setSearchVisible(!searchVisible)} // Toggle search visibility
        />
        <div className="navbar-profile">
          <Link to={profileImage ? "/profile" : "/login"}>
            <img
              src={profileImage || profile_icon}
              alt="Profile"
              className="profile"
            />
          </Link>
          <img src={caret_icon} alt="" />
        </div>
      </div>
      {searchVisible && <Search onClose={() => setSearchVisible(false)} />}
    </div>
  );
};

export default Navbar;
