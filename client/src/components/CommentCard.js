"use client";

export default function CommentCard({ logged, comment, setCommentToEdit }) {
  function sendCommentDataToForm() {
    setCommentToEdit(comment);
  }

  function deleteComment() {}

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
                  <a
                    href="#comment_form"
                    onClick={sendCommentDataToForm}
                    className="mr-2"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </a>
                  <button onClick={deleteComment}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <p className="text-gray-400 text-sm">{comment.createdAt}</p>
          </div>
        </div>
        <p className="-mt-4 text-gray-500">{comment.content}</p>
      </div>
    </div>
  );
}
