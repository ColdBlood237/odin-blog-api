"use client";

import axios from "axios";
import { Button, Card } from "flowbite-react";
import { useState } from "react";

export default function PostCard({ logged, post }) {
  const [errorMessage, setErrorMessage] = useState("");

  async function deletePost() {
    const storedToken = localStorage.getItem("authToken");
    try {
      await axios.delete(`/posts/${post._id}`, {
        headers: {
          Authorization: storedToken,
        },
      });
    } catch (error) {
      alert(error.msg);
    }
  }

  return (
    <Card className="max-w-sm">
      <div className="flex items-center justify-between">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <p>{post.title}</p>
        </h5>
        {logged ? (
          <div className="flex gap-2">
            <a href={`/posts/${post._id}/edit`}>
              <i className="fa-solid fa-gear"></i>
            </a>
            <button onClick={deletePost} className="hover:cursor-pointer">
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {logged ? (
        post.public ? (
          <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 w-fit">
            Public
          </span>
        ) : (
          <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 w-fit">
            Private
          </span>
        )
      ) : (
        <></>
      )}
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {post.createdAt}
      </p>
      <Button href={`/posts/${post._id}`}>
        <p>Read more</p>
        <svg
          className="-mr-1 ml-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Button>
    </Card>
  );
}
