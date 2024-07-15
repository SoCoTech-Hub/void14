"use client";
import { CompleteFeedbackValue } from "@soco/feedback-db/schema/feedbackValues";
import { trpc } from "@/lib/trpc/client";
import FeedbackValueModal from "./FeedbackValueModal";


export default function FeedbackValueList({ feedbackValues }: { feedbackValues: CompleteFeedbackValue[] }) {
  const { data: f } = trpc.feedbackValues.getFeedbackValues.useQuery(undefined, {
    initialData: { feedbackValues },
    refetchOnMount: false,
  });

  if (f.feedbackValues.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.feedbackValues.map((feedbackValue) => (
        <FeedbackValue feedbackValue={feedbackValue} key={feedbackValue.id} />
      ))}
    </ul>
  );
}

const FeedbackValue = ({ feedbackValue }: { feedbackValue: CompleteFeedbackValue }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{feedbackValue.completed}</div>
      </div>
      <FeedbackValueModal feedbackValue={feedbackValue} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No feedback values
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new feedback value.
      </p>
      <div className="mt-6">
        <FeedbackValueModal emptyState={true} />
      </div>
    </div>
  );
};

