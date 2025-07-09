import "./App.css";
import React from "react";
import Home from "./pages/home";
import { Toaster } from "sonner";
import Album from "./pages/album";
import Artist from "./pages/artist";
import Layout from "./pages/Layout";
import Search from "./pages/search";
import Explore from "./pages/explore";
import ReactDOM from "react-dom/client";
import Playlist from "./pages/playlist";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import CategoryContent from "./pages/CategoryContent";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/search",
        Component: Search,
      },
      {
        path: "/explore",
        Component: Explore,
      },
      {
        path: "/explore/:params",
        Component: CategoryContent,
      },
      {
        path: "playlist/:id",
        Component: Playlist,
      },
      {
        path: "album/:id",
        Component: Album,
      },
      {
        path: "artist/:id",
        Component: Artist,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
);
