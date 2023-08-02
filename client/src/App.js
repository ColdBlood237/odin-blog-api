import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import NavbarCTA from "./components/Navbar";
import Home from "./components/Home";
import Post from "./components/Post";
import PostForm from "./components/PostForm";

import "./index.css";

export default function App() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    async function validateToken() {
      const storedToken = localStorage.getItem("authToken");
      try {
        console.log(storedToken);
        await axios.get("/validate-token", {
          headers: {
            Authorization: storedToken,
          },
        });
        setLogged(true); // token is valid
      } catch (error) {
        setLogged(false); // token is not valid
      }
    }
    validateToken();
  }, []);

  return (
    <div>
      <NavbarCTA logged={logged} setLogged={setLogged} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home logged={logged} setLogged={setLogged} />}
        />
        <Route
          path="/posts/:id"
          element={<Post logged={logged} setLogged={setLogged} />}
        />
        <Route
          path="/posts/:id/edit"
          element={<PostForm logged={logged} setLogged={setLogged} />}
        />
      </Routes>
    </div>
  );
}
