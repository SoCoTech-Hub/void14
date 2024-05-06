"use client";
import { CompleteComment } from "@/lib/db/schema/comments";
import { trpc } from "@/lib/trpc/client";
import CommentModal from "./CommentModal";


export default function CommentList({ comments }: { comments: CompleteComment[] }) {
  const { data: c } = trpc.comments.getComments.useQuery(undefined, {
    initialData: { comments },
    refetchOnMount: false,
  });

  if (c.comments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </ul>
  );
}

const Comment = ({ comment }: { comment: CompleteComment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{comment.commentArea}</div>
      </div>
      <CommentModal comment={comment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No comments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new comment.
      </p>
      <div className="mt-6">
        <CommentModal emptyState={true} />
      </div>
    </div>
  );
};

