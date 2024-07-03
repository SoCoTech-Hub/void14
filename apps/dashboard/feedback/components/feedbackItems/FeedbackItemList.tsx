"use client";
import { CompleteFeedbackItem } from "@/lib/db/schema/feedbackItems";
import { trpc } from "@/lib/trpc/client";
import FeedbackItemModal from "./FeedbackItemModal";


export default function FeedbackItemList({ feedbackItems }: { feedbackItems: CompleteFeedbackItem[] }) {
  const { data: f } = trpc.feedbackItems.getFeedbackItems.useQuery(undefined, {
    initialData: { feedbackItems },
    refetchOnMount: false,
  });

  if (f.feedbackItems.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.feedbackItems.map((feedbackItem) => (
        <FeedbackItem feedbackItem={feedbackItem} key={feedbackItem.id} />
      ))}
    </ul>
  );
}

const FeedbackItem = ({ feedbackItem }: { feedbackItem: CompleteFeedbackItem }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{feedbackItem.dependItem}</div>
      </div>
      <FeedbackItemModal feedbackItem={feedbackItem} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No feedback items
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new feedback item.
      </p>
      <div className="mt-6">
        <FeedbackItemModal emptyState={true} />
      </div>
    </div>
  );
};

