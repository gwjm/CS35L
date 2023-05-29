import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

// All routes
import Home from "./routes/Home";
import Contact from "./routes/Contact";
import Projects from "./routes/CreateProject";
import About from "./routes/About";
import NavBar from "./components/Navbar";
import ErrorPage from "./routes/ErrorPage";
import Todo from "./routes/Todo";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard"
import ProjectDetails from "./routes/ProjectDetails";
import Profile from "./routes/Profile";

//Contexts
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

//For Login
import { AuthProvider } from './contexts/AuthProvider';

const AppLayout = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavBar />
        <Outlet />
      </ThemeProvider>
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/Projects",
        element: <Projects />,
      },
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Todo",
        element: <Todo />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/Projects/:id",
        element: <ProjectDetails />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
