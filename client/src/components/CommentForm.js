import axios from "axios";
import { useEffect, useState } from "react";

export default function CommentForm({ logged, post, commentToEdit }) {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [_id, set_id] = useState("");

  useEffect(() => {
    if (commentToEdit !== null) {
      setUsername(commentToEdit.username);
      setContent(commentToEdit.content);
      set_id(commentToEdit._id);
    }
  }, [commentToEdit]);

  function submitHandler(e) {
    e.preventDefault();
    if (commentToEdit !== null) {
      updateComment();
    } else {
      createComment();
    }
  }

  async function updateComment() {
    const updatedComment = { _id, username, content };
    const options = {
      headers: {
        Authorization: localStorage.getItem("authToken"),
      },
    };
    try {
      await axios.put(
        `/posts/${post._id}/comments/${_id}`,
        updatedComment,
        options
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  async function createComment() {
    const newComment = { username, content };
    const options = {
      headers: {
        Authorization: localStorage.getItem("authToken"),
      },
    };
    try {
      await axios.post(`/posts/${post._id}/comments`, newComment, options);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex mx-auto items-center justify-center shadow-lg mt-8 mx-8 mb-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
            {commentToEdit !== null ? "Edit this comment" : "Add a new comment"}
          </h2>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <input
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-10 mb-2 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="content"
              placeholder="Type Your Comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="w-full md:w-full flex items-start md:w-full px-3">
            <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto"></div>
            <div className="-mr-1">
              <input
                type="submit"
                className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                value="Post Comment"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
