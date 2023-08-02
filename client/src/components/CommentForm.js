export default function CommentForm({ post }) {
  return (
    <div className="flex mx-auto items-center justify-center shadow-lg mt-8 mx-8 mb-4">
      <form
        method="POST"
        action={`http://localhost:3000/posts/${post._id}/comments`}
        className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
            Add a new comment
          </h2>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <input
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-10 mb-2 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="username"
              placeholder="username"
            />
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="content"
              placeholder="Type Your Comment"
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
