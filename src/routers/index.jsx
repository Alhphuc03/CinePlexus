import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../page/Home/Home";
import Player from "./../page/Player/Player";
import Movie from "../page/Movies/Movie";
import TvShow from "../page/TvShow/TvShow";
import Login from "../page/Login/Login";
import AllTvShow from "../page/TvShow/AllTvShow/AllTvShow";
import AllMovies from "../page/Movies/AllMovie/AllMovie";
import MovieDetail from "../page/Detail/MovieDetail/MovieDetail";
import Profile from "../page/Profile/Profile";
import WatchMovie from "../page/WatchMovie/WatchMovie";
import TvDetail from "../page/Detail/TvDetail/TvDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movie />,
      },
      {
        path: "/allMovies",
        element: <AllMovies />,
      },
      {
        path: "/tvShow",
        element: <TvShow />,
      },
      {
        path: "/allTvShow",
        element: <AllTvShow />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "player/:cate/:id",
        element: <Player />,
      },
      {
        path: "movieDetail/:id",
        element: <MovieDetail />,
      },
      {
        path: "tvDetail/:id",
        element: <TvDetail />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      {
        path: "watchMovie/:id/:title",
        element: <WatchMovie />,
      },
    ],
  },
]);

export default router;
