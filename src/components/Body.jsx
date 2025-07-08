import Login from "./Login";
import Browse from "./Browse";
import MovieDetail from "./MovieDetail"; // ✅ import
import "../App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/movie/:id", // ✅ movie detail route
    element: <MovieDetail />,
  },
]);

const Body = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
