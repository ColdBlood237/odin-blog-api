import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

export default function Post({ post, comments }) {
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <h2>Comments</h2>
      <CommentForm post={post} />
      {comments.map((comment) => (
        <CommentCard comment={comment} />
      ))}
    </>
  );
}
