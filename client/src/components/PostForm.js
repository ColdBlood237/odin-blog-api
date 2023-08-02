import { useState } from "react";

export default function PoostFomr({ logged }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publicBool, setPublicBool] = useState(false);

  return (
    <div className="flex justify-center px-8 ">
      <form className="flex flex-col gap-2 my-32 w-full md:w-4/5 lg:w-4/5">
        <h1 className="text-3xl text-semibold self-center">New Post</h1>
        <div>
          <label
            for="title"
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
            for="content"
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
            value={true}
            onChange={(e) => {
              e.target.checked ? setPublicBool(true) : setPublicBool(false);
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="public"
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
      </form>
    </div>
  );
}
