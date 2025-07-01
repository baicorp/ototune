import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./pages/Layout";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import Search from "./pages/search";
import Playlist from "./pages/playlist";
import Album from "./pages/album";
import Artist from "./pages/artist";
import Home from "./pages/home";
import "./App.css";
import Factory from "./pages/compFactory";

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
        path: "/comp-factory",
        Component: Factory,
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
