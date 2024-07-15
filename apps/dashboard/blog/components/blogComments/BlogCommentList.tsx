"use client";
import { CompleteBlogComment } from "@soco/blog-db/schema/blogComments";
import { trpc } from "@/lib/trpc/client";
import BlogCommentModal from "./BlogCommentModal";


export default function BlogCommentList({ blogComments }: { blogComments: CompleteBlogComment[] }) {
  const { data: b } = trpc.blogComments.getBlogComments.useQuery(undefined, {
    initialData: { blogComments },
    refetchOnMount: false,
  });

  if (b.blogComments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.blogComments.map((blogComment) => (
        <BlogComment blogComment={blogComment} key={blogComment.blogComment.id} />
      ))}
    </ul>
  );
}

const BlogComment = ({ blogComment }: { blogComment: CompleteBlogComment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{blogComment.blogComment.blogId}</div>
      </div>
      <BlogCommentModal blogComment={blogComment.blogComment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No blog comments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new blog comment.
      </p>
      <div className="mt-6">
        <BlogCommentModal emptyState={true} />
      </div>
    </div>
  );
};

