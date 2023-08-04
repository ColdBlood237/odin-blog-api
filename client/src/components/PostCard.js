"use client";

import axios from "axios";
import format from "date-format";
import { Button, Card } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PostCard({ logged, post }) {
  const [errorMessage, setErrorMessage] = useState("");

  async function deletePost() {
    console.log(post._id);
    const storedToken = localStorage.getItem("authToken");
    try {
      await axios.delete(
        `https://odin-blog-api-k82n.onrender.com/posts/${post._id}`,
        {
          headers: {
            Authorization: storedToken,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
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
            <Link to={`/posts/${post._id}/edit`}>
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
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
          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 w-fit">
            Public
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 w-fit">
            Private
          </span>
        )
      ) : (
        <></>
      )}
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {format.asString("dd/MM/yyyy at hh:mm", new Date(post.createdAt))}
      </p>
      <Link to={`/posts/${post._id}`}>
        <Button>
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
      </Link>
    </Card>
  );
}
