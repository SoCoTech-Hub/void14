"use client";
import { CompletePost } from "@soco/post-db/schema/posts";
import { trpc } from "@/lib/trpc/client";
import PostModal from "./PostModal";


export default function PostList({ posts }: { posts: CompletePost[] }) {
  const { data: p } = trpc.posts.getPosts.useQuery(undefined, {
    initialData: { posts },
    refetchOnMount: false,
  });

  if (p.posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </ul>
  );
}

const Post = ({ post }: { post: CompletePost }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{post.attachment}</div>
      </div>
      <PostModal post={post} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No posts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new post.
      </p>
      <div className="mt-6">
        <PostModal emptyState={true} />
      </div>
    </div>
  );
};

