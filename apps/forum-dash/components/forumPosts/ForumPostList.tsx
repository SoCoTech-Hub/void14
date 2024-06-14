"use client";
import { CompleteForumPost } from "@/lib/db/schema/forumPosts";
import { trpc } from "@/lib/trpc/client";
import ForumPostModal from "./ForumPostModal";


export default function ForumPostList({ forumPosts }: { forumPosts: CompleteForumPost[] }) {
  const { data: f } = trpc.forumPosts.getForumPosts.useQuery(undefined, {
    initialData: { forumPosts },
    refetchOnMount: false,
  });

  if (f.forumPosts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.forumPosts.map((forumPost) => (
        <ForumPost forumPost={forumPost} key={forumPost.id} />
      ))}
    </ul>
  );
}

const ForumPost = ({ forumPost }: { forumPost: CompleteForumPost }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{forumPost.attachment}</div>
      </div>
      <ForumPostModal forumPost={forumPost} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No forum posts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new forum post.
      </p>
      <div className="mt-6">
        <ForumPostModal emptyState={true} />
      </div>
    </div>
  );
};

