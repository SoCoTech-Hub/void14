"use client";
import { CompleteFeedbackValuetmp } from "@/lib/db/schema/feedbackValuetmps";
import { trpc } from "@/lib/trpc/client";
import FeedbackValuetmpModal from "./FeedbackValuetmpModal";


export default function FeedbackValuetmpList({ feedbackValuetmps }: { feedbackValuetmps: CompleteFeedbackValuetmp[] }) {
  const { data: f } = trpc.feedbackValuetmps.getFeedbackValuetmps.useQuery(undefined, {
    initialData: { feedbackValuetmps },
    refetchOnMount: false,
  });

  if (f.feedbackValuetmps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.feedbackValuetmps.map((feedbackValuetmp) => (
        <FeedbackValuetmp feedbackValuetmp={feedbackValuetmp} key={feedbackValuetmp.id} />
      ))}
    </ul>
  );
}

const FeedbackValuetmp = ({ feedbackValuetmp }: { feedbackValuetmp: CompleteFeedbackValuetmp }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{feedbackValuetmp.completed}</div>
      </div>
      <FeedbackValuetmpModal feedbackValuetmp={feedbackValuetmp} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No feedback valuetmps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new feedback valuetmp.
      </p>
      <div className="mt-6">
        <FeedbackValuetmpModal emptyState={true} />
      </div>
    </div>
  );
};

