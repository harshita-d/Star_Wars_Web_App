import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/common/rootLayout/RootLayout";
import MovieOverview from "../components/MovieOverview/MovieOverview";
import Home from "../pages/Home";
import CheckAuthStatus from "../components/common/helper/CheckAuthStatus";
import AuthTemplate from "../components/common/AutharizationPage/authTemplate/AuthTemplate";
import Details from "../components/common/details/Details";
import FavoriteView from "../components/Favorites/FavoriteView";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "auth", element: <AuthTemplate /> },
      {
        path: "/movie",
        element: (
          <CheckAuthStatus>
            <MovieOverview />
          </CheckAuthStatus>
        ),
      },
      {
        path: "/movieDetail",
        element: (
          <CheckAuthStatus>
            <Details />
          </CheckAuthStatus>
        ),
      },
      {
        path: "/favourites",
        element: (
          <CheckAuthStatus>
            <FavoriteView />
          </CheckAuthStatus>
        ),
      },
    ],
  },
]);
