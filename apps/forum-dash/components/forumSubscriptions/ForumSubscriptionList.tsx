"use client";
import { CompleteForumSubscription } from "@/lib/db/schema/forumSubscriptions";
import { trpc } from "@/lib/trpc/client";
import ForumSubscriptionModal from "./ForumSubscriptionModal";


export default function ForumSubscriptionList({ forumSubscriptions }: { forumSubscriptions: CompleteForumSubscription[] }) {
  const { data: f } = trpc.forumSubscriptions.getForumSubscriptions.useQuery(undefined, {
    initialData: { forumSubscriptions },
    refetchOnMount: false,
  });

  if (f.forumSubscriptions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.forumSubscriptions.map((forumSubscription) => (
        <ForumSubscription forumSubscription={forumSubscription} key={forumSubscription.forumSubscription.id} />
      ))}
    </ul>
  );
}

const ForumSubscription = ({ forumSubscription }: { forumSubscription: CompleteForumSubscription }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{forumSubscription.forumSubscription.forumId}</div>
      </div>
      <ForumSubscriptionModal forumSubscription={forumSubscription.forumSubscription} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No forum subscriptions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new forum subscription.
      </p>
      <div className="mt-6">
        <ForumSubscriptionModal emptyState={true} />
      </div>
    </div>
  );
};

