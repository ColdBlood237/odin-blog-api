import { useEffect, useState } from "react";
import uniqid from "uniqid";

import Hero from "./Hero";
import LoginForm from "./LoginForm";
import PostCard from "./PostCard";

export default function Home({ logged, setLogged }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch("/posts", {
        mode: "cors",
      });

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const posts = await response.json();
      setPosts(posts);
    }
    getPosts();
  }, [posts.length]);

  return (
    <>
      <Hero />
      <div id="posts" className="m-12">
        {posts.map((post) => (
          <PostCard logged={logged} post={post} key={uniqid()} />
        ))}
      </div>
      {logged ? (
        <div className="flex justify-center mb-8">
          <a href="posts/create" className="mx-auto flex items-center gap-2">
            <i className="fa-regular fa-square-plus fa-2xl"></i>{" "}
            <span className="text-xl text-bold">Create a Post</span>
          </a>
        </div>
      ) : (
        <div id="login" className="mx-12 mb-12">
          <LoginForm logged={logged} setLogged={setLogged} />
        </div>
      )}
    </>
  );
}
