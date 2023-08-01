import React from "react";
import { Route, Routes } from "react-router-dom";

import NavbarCTA from "./components/Navbar";
import Home from "./components/Home";
import Post from "./components/Post";

export default function App() {
  return (
    <div>
      <NavbarCTA />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
      </Routes>
    </div>
  );
}
