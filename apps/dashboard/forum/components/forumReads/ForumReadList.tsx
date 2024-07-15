"use client";
import { CompleteForumRead } from "@soco/forum-db/schema/forumReads";
import { trpc } from "@/lib/trpc/client";
import ForumReadModal from "./ForumReadModal";


export default function ForumReadList({ forumReads }: { forumReads: CompleteForumRead[] }) {
  const { data: f } = trpc.forumReads.getForumReads.useQuery(undefined, {
    initialData: { forumReads },
    refetchOnMount: false,
  });

  if (f.forumReads.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.forumReads.map((forumRead) => (
        <ForumRead forumRead={forumRead} key={forumRead.id} />
      ))}
    </ul>
  );
}

const ForumRead = ({ forumRead }: { forumRead: CompleteForumRead }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{forumRead.discussionId}</div>
      </div>
      <ForumReadModal forumRead={forumRead} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No forum reads
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new forum read.
      </p>
      <div className="mt-6">
        <ForumReadModal emptyState={true} />
      </div>
    </div>
  );
};

