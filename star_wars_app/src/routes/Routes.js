import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/common/rootLayout/RootLayout";
import Signup from "../components/common/AutharizationPage/signin/SignIn";
import HomePage from "../components/Home/HomePage";
import MovieOverview from "../components/MovieOverview/MovieOverview";
import SideBar from "../components/sideBar/SideBar";
import Home from "../pages/Home";
import CheckAuthStatus from "../components/common/helper/CheckAuthStatus";
import AuthTemplate from "../components/common/AutharizationPage/authTemplate/AuthTemplate";
import Details from "../components/common/details/Details";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "auth", element: <AuthTemplate /> },
      { path: "/movie", element: <MovieOverview />, loader: CheckAuthStatus },
      { path: "/movieDetail", element: <Details />, loader: CheckAuthStatus },
    ],
  },
]);
