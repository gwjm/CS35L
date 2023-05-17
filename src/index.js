import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./routes/Home";
import Contact from "./routes/Contact";
import Projects from "./routes/Projects";
import About from "./routes/About";
import NavBar from "./components/Navbar";
import ErrorPage from "./routes/ErrorPage";
import Todo from "./routes/Todo";
import Login from "./routes/Login";

// TODO: Replace with ant design
import "./index.css";
import useTheme from "./hooks/useTheme";
const ThemeContext = React.createContext();


const AppLayout = () => {
  const [ theme, setTheme ] = useTheme();

  return (
    <>
      <NavBar theme={theme} toggleTheme={setTheme} />
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
        element: <Home/>,
      },
      {
        path: "/Contact",
        element: <Contact/>,
      },
      {
        path: "/Projects",
        element: <Projects/>,
      },
      {
        path: "/Todo",
        element: <Todo/>,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  }
]);

// TODO: add global theme selector
createRoot(document.getElementById("root")).render(

  // <ThemeContext.Provider value={{ theme, setTheme }}>
    <RouterProvider router={router} />
  // </ThemeContext.Provider> // TODO: pass theme as context to all routes

);

// TODO: add all routes here using nodejs fs module
// const addAllRoutes = () => {};