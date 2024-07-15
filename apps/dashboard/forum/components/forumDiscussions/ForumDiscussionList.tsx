"use client";
import { CompleteForumDiscussion } from "@soco/forum-db/schema/forumDiscussions";
import { trpc } from "@/lib/trpc/client";
import ForumDiscussionModal from "./ForumDiscussionModal";


export default function ForumDiscussionList({ forumDiscussions }: { forumDiscussions: CompleteForumDiscussion[] }) {
  const { data: f } = trpc.forumDiscussions.getForumDiscussions.useQuery(undefined, {
    initialData: { forumDiscussions },
    refetchOnMount: false,
  });

  if (f.forumDiscussions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.forumDiscussions.map((forumDiscussion) => (
        <ForumDiscussion forumDiscussion={forumDiscussion} key={forumDiscussion.id} />
      ))}
    </ul>
  );
}

const ForumDiscussion = ({ forumDiscussion }: { forumDiscussion: CompleteForumDiscussion }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{forumDiscussion.assessed}</div>
      </div>
      <ForumDiscussionModal forumDiscussion={forumDiscussion} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No forum discussions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new forum discussion.
      </p>
      <div className="mt-6">
        <ForumDiscussionModal emptyState={true} />
      </div>
    </div>
  );
};

