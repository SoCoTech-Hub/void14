"use client";
import { CompleteFeedbackCompleted } from "@/lib/db/schema/feedbackCompleteds";
import { trpc } from "@/lib/trpc/client";
import FeedbackCompletedModal from "./FeedbackCompletedModal";


export default function FeedbackCompletedList({ feedbackCompleteds }: { feedbackCompleteds: CompleteFeedbackCompleted[] }) {
  const { data: f } = trpc.feedbackCompleteds.getFeedbackCompleteds.useQuery(undefined, {
    initialData: { feedbackCompleteds },
    refetchOnMount: false,
  });

  if (f.feedbackCompleteds.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.feedbackCompleteds.map((feedbackCompleted) => (
        <FeedbackCompleted feedbackCompleted={feedbackCompleted} key={feedbackCompleted.id} />
      ))}
    </ul>
  );
}

const FeedbackCompleted = ({ feedbackCompleted }: { feedbackCompleted: CompleteFeedbackCompleted }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{feedbackCompleted.anonymousResponse}</div>
      </div>
      <FeedbackCompletedModal feedbackCompleted={feedbackCompleted} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No feedback completeds
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new feedback completed.
      </p>
      <div className="mt-6">
        <FeedbackCompletedModal emptyState={true} />
      </div>
    </div>
  );
};

