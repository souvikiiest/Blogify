import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import BlogPage from "./pages/BlogPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import MyBlog from "./pages/MyBlog";
import NewBlog from "./pages/NewBlog";
import Signin from "./pages/Signin";
import Singup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Singup />,
  },
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/blog",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog/:id",
    element: <BlogPage />,
  },
  {
    path: "/blog/edit/:id",
    element: <NewBlog />,
  },
  {
    path: "/addBlog",
    element: <NewBlog />,
  },
  {
    path: "/myblogs",
    element: <MyBlog />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
