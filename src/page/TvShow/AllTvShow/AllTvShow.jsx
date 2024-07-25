import { useLocation } from "react-router-dom";
import CardsTV from "../../../components/CardTV/CardTv";
import Navbar from "../../../components/Navbar/Navbar";
import "./AllTvShow.css";

import loading from "../../../assets/Animation - 1720970751731.gif";
import { useEffect, useState } from "react";
import tmdbApi from "../../../api/api";
import { FaAnglesDown } from "react-icons/fa6";
import { FaAngleDoubleUp } from "react-icons/fa";
const AllTvShow = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title");
  const category = searchParams.get("category");
  const quantity = parseInt(searchParams.get("quantity"));
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [titleSort, setTitleSort] = useState("Sort");
  const [apiData, setApiData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectSort, setSelectSort] = useState("popularity.desc");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tmdbApi.getGenerTvs();
        if (response.genres) {
          const allGenre = { id: "all", name: "All" };
          setApiData([allGenre, ...response.genres]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleSortSelection = (sortOption, sortValue) => {
    setTitleSort(sortOption);
    setIsDropdownOpen(false);
    setSelectSort(sortValue);
  };

  const handleGenreSelection = (genreId) => {
    setSelectedGenre(genreId);
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="">
        {isLoading ? (
          <div className="loading-container">
            <img src={loading} alt="Loading..." className="loading-gif" />
          </div>
        ) : (
          <div className="all-tv-show">
            <div className="left-content">
              <h2>{title}</h2>
              <div className="dropdown-sort" onClick={toggleDropdown}>
                <div className="dropdown-title">
                  <span>{titleSort}</span>
                  {isDropdownOpen ? (
                    <FaAngleDoubleUp className="icon-down" />
                  ) : (
                    <FaAnglesDown className="icon-down" />
                  )}
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-list">
                    <p
                      className="item-list"
                      onClick={() =>
                        handleSortSelection("Descending", "popularity.desc")
                      }
                    >
                      Descending
                    </p>
                    <p
                      className="item-list"
                      onClick={() =>
                        handleSortSelection("Ascending", "popularity.asc")
                      }
                    >
                      Ascending
                    </p>
                    <p
                      className="item-list"
                      onClick={() =>
                        handleSortSelection("Name A-Z", "original_title.asc")
                      }
                    >
                      Name A-Z
                    </p>
                    <p
                      className="item-list"
                      onClick={() =>
                        handleSortSelection("Name Z-A", "original_title.desc")
                      }
                    >
                      Name Z-A
                    </p>
                    <p
                      className="item-list"
                      onClick={() =>
                        handleSortSelection(
                          "Date Ascending",
                          "first_air_date.asc"
                        )
                      }
                    >
                      First Air Date Ascending
                    </p>
                    <p
                      className="item-list"
                      onClick={() =>
                        handleSortSelection(
                          "Date Descending",
                          "first_air_date.desc"
                        )
                      }
                    >
                      First Air Date Descending
                    </p>
                  </div>
                )}
              </div>
              <div className="genres-list">
                <div className="genres-title">Genres Tv</div>
                <div className="genres-list-item">
                  {apiData && apiData.length > 0 ? (
                    apiData.map((item, index) => (
                      <button
                        key={index}
                        className={`item-list ${
                          selectedGenre === item.id ? "active" : ""
                        }`}
                        onClick={() => handleGenreSelection(item.id)}
                      >
                        {item.name}
                      </button>
                    ))
                  ) : (
                    <p>No genres available</p>
                  )}
                </div>
              </div>
            </div>
            <div className="right-content">
              <CardsTV
                title={title}
                category={category}
                quantity={parseInt(quantity)}
                selectedGenre={selectedGenre}
                sortOption={selectSort}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTvShow;
