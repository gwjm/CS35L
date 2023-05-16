import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import NavBar from "./components/Navbar";
import ErrorPage from "./routes/ErrorPage";
import ToDo from "./routes/ToDo";
import "./index.css";

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Home />
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/to-do",
        element: <ToDo />,
      },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
