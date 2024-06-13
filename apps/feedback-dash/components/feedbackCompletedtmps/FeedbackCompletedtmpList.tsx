"use client";
import { CompleteFeedbackCompletedtmp } from "@/lib/db/schema/feedbackCompletedtmps";
import { trpc } from "@/lib/trpc/client";
import FeedbackCompletedtmpModal from "./FeedbackCompletedtmpModal";


export default function FeedbackCompletedtmpList({ feedbackCompletedtmps }: { feedbackCompletedtmps: CompleteFeedbackCompletedtmp[] }) {
  const { data: f } = trpc.feedbackCompletedtmps.getFeedbackCompletedtmps.useQuery(undefined, {
    initialData: { feedbackCompletedtmps },
    refetchOnMount: false,
  });

  if (f.feedbackCompletedtmps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.feedbackCompletedtmps.map((feedbackCompletedtmp) => (
        <FeedbackCompletedtmp feedbackCompletedtmp={feedbackCompletedtmp} key={feedbackCompletedtmp.id} />
      ))}
    </ul>
  );
}

const FeedbackCompletedtmp = ({ feedbackCompletedtmp }: { feedbackCompletedtmp: CompleteFeedbackCompletedtmp }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{feedbackCompletedtmp.anonymousResponse}</div>
      </div>
      <FeedbackCompletedtmpModal feedbackCompletedtmp={feedbackCompletedtmp} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No feedback completedtmps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new feedback completedtmp.
      </p>
      <div className="mt-6">
        <FeedbackCompletedtmpModal emptyState={true} />
      </div>
    </div>
  );
};

