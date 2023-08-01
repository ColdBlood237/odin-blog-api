"use client";

export default function CommentCard({ comment }) {
  return (
    <div class="flex justify-center relative top-1/3">
      <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
        <div class="relative flex gap-4">
          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-between">
              <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">
                {comment.username}
              </p>
            </div>
            <p class="text-gray-400 text-sm">{comment.createdAt}</p>
          </div>
        </div>
        <p class="-mt-4 text-gray-500">{comment.content}</p>
      </div>
    </div>
  );
}
