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
          <PostCard post={post} key={uniqid()} />
        ))}
      </div>
      {logged ? (
        <></>
      ) : (
        <div id="login" className="mx-12 mb-12">
          <LoginForm logged={logged} setLogged={setLogged} />
        </div>
      )}
    </>
  );
}
