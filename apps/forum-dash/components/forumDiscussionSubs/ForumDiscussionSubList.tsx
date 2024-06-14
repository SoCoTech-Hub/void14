"use client";
import { CompleteForumDiscussionSub } from "@/lib/db/schema/forumDiscussionSubs";
import { trpc } from "@/lib/trpc/client";
import ForumDiscussionSubModal from "./ForumDiscussionSubModal";


export default function ForumDiscussionSubList({ forumDiscussionSubs }: { forumDiscussionSubs: CompleteForumDiscussionSub[] }) {
  const { data: f } = trpc.forumDiscussionSubs.getForumDiscussionSubs.useQuery(undefined, {
    initialData: { forumDiscussionSubs },
    refetchOnMount: false,
  });

  if (f.forumDiscussionSubs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.forumDiscussionSubs.map((forumDiscussionSub) => (
        <ForumDiscussionSub forumDiscussionSub={forumDiscussionSub} key={forumDiscussionSub.id} />
      ))}
    </ul>
  );
}

const ForumDiscussionSub = ({ forumDiscussionSub }: { forumDiscussionSub: CompleteForumDiscussionSub }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{forumDiscussionSub.discussion}</div>
      </div>
      <ForumDiscussionSubModal forumDiscussionSub={forumDiscussionSub} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No forum discussion subs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new forum discussion sub.
      </p>
      <div className="mt-6">
        <ForumDiscussionSubModal emptyState={true} />
      </div>
    </div>
  );
};

