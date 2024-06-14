"use client";
import { CompleteForumQueue } from "@/lib/db/schema/forumQueues";
import { trpc } from "@/lib/trpc/client";
import ForumQueueModal from "./ForumQueueModal";


export default function ForumQueueList({ forumQueues }: { forumQueues: CompleteForumQueue[] }) {
  const { data: f } = trpc.forumQueues.getForumQueues.useQuery(undefined, {
    initialData: { forumQueues },
    refetchOnMount: false,
  });

  if (f.forumQueues.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.forumQueues.map((forumQueue) => (
        <ForumQueue forumQueue={forumQueue} key={forumQueue.id} />
      ))}
    </ul>
  );
}

const ForumQueue = ({ forumQueue }: { forumQueue: CompleteForumQueue }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{forumQueue.discussionId}</div>
      </div>
      <ForumQueueModal forumQueue={forumQueue} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No forum queues
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new forum queue.
      </p>
      <div className="mt-6">
        <ForumQueueModal emptyState={true} />
      </div>
    </div>
  );
};

