import axios from "axios";
import { useEffect, useState } from "react";

export default function PostForm({ logged, action }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publicBool, setPublicBool] = useState(false);
  const [_id, set_id] = useState();

  useEffect(() => {
    if (action === "edit") {
      async function getPost() {
        const postID = window.location.pathname.replace(
          /\/posts\/([^/]+)\/edit/,
          "$1"
        );
        set_id(postID);
        try {
          const response = await axios.get(
            `https://odin-blog-api-k82n.onrender.com/posts/${postID}`
          );
          const postFetched = response.data;
          setTitle(postFetched.title);
          setContent(postFetched.content);
          setPublicBool(postFetched.public);
        } catch (error) {
          console.error(error);
        }
      }
      getPost();
    }
  }, []);

  function submtiHandler(e) {
    e.preventDefault();

    if (action === "edit") {
      updatePost();
    } else {
      createPost();
    }
  }

  async function updatePost() {
    const updatedPost = { _id, title, content, public: publicBool };
    const storedToken = localStorage.getItem("authToken");
    try {
      await axios.put(
        `https://odin-blog-api-k82n.onrender.com/posts/${_id}`,
        updatedPost,
        {
          headers: {
            Authorization: storedToken,
          },
        }
      );
      window.location = "/";
    } catch (error) {
      console.error(error);
    }
  }

  async function createPost() {
    const newPost = { title, content, public: publicBool };
    const storedToken = localStorage.getItem("authToken");
    try {
      await axios.post(
        "https://odin-blog-api-k82n.onrender.com/posts",
        newPost,
        {
          headers: {
            Authorization: storedToken,
          },
        }
      );
      window.location = "/";
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="flex justify-center px-8 ">
      <form
        onSubmit={submtiHandler}
        className="flex flex-col gap-2 my-32 w-full md:w-4/5 lg:w-4/5"
      >
        <h1 className="text-3xl text-semibold self-center">
          {action === "create" ? "New Post" : "Edit Post"}
        </h1>
        {action === "edit" && title === "" && content === "" ? (
          <div class="text-center my-16">
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Content
              </label>
              <textarea
                id="content"
                rows="4"
                name="content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="public"
                type="checkbox"
                name="public"
                defaultChecked={publicBool}
                onChange={(e) => {
                  setPublicBool(e.target.checked);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="public"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Public
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
}
