import { useEffect, useState } from "react";
import Hero from "./Hero";
import LoginForm from "./LoginForm";
import PostCard from "./PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch("http://localhost:3000/posts", {
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
      <div id="posts" className="p-12">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </>
  );
}
