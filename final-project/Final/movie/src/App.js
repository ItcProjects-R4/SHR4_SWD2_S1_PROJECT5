import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";

import Layout from "./layout/layout";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "search", element: <SearchResults /> },
        { path: "moviedetails/:id", element: <MovieDetails /> },
        { path: "favorites", element: <Favorites /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  );
}

export default App;
