"use client";
import { CompleteFeedback } from "@/lib/db/schema/feedbacks";
import { trpc } from "@/lib/trpc/client";
import FeedbackModal from "./FeedbackModal";


export default function FeedbackList({ feedbacks }: { feedbacks: CompleteFeedback[] }) {
  const { data: f } = trpc.feedbacks.getFeedbacks.useQuery(undefined, {
    initialData: { feedbacks },
    refetchOnMount: false,
  });

  if (f.feedbacks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.feedbacks.map((feedback) => (
        <Feedback feedback={feedback} key={feedback.id} />
      ))}
    </ul>
  );
}

const Feedback = ({ feedback }: { feedback: CompleteFeedback }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{feedback.anonymous}</div>
      </div>
      <FeedbackModal feedback={feedback} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No feedbacks
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new feedback.
      </p>
      <div className="mt-6">
        <FeedbackModal emptyState={true} />
      </div>
    </div>
  );
};

