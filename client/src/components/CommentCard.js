"use client";

import axios from "axios";
import format from "date-format";
import { Link } from "react-router-dom";
import { LinkScroll, animateScroll as scroll } from "react-scroll";

export default function CommentCard({ logged, comment, setCommentToEdit }) {
  function sendCommentDataToForm() {
    setCommentToEdit(comment);
  }

  async function deleteComment() {
    const options = {
      headers: {
        Authorization: localStorage.getItem("authToken"),
      },
    };
    try {
      await axios.delete(
        `https://odin-blog-api-k82n.onrender.com/posts/${comment.post}/comments/${comment._id}`,
        options
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center relative top-1/3 w-full md:w-1/2 lg:w-2/5">
      <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg w-full">
        <div className="relative flex gap-4">
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between">
              <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                {comment.username}
              </p>
              {logged ? (
                <div>
                  <LinkScroll
                    to="comment_form"
                    smooth={true}
                    offset={100}
                    duration={500}
                    onClick={sendCommentDataToForm}
                    className="mr-2"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </LinkScroll>
                  <button onClick={deleteComment}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <p className="text-gray-400 text-sm">
              {format.asString(
                "dd/MM/yyyy at hh:mm",
                new Date(comment.createdAt)
              )}
            </p>
          </div>
        </div>
        <p className="-mt-4 text-gray-500">{comment.content}</p>
      </div>
    </div>
  );
}
