"use client";
import { CompleteGradingformGuideComment } from "@/lib/db/schema/gradingformGuideComments";
import { trpc } from "@/lib/trpc/client";
import GradingformGuideCommentModal from "./GradingformGuideCommentModal";


export default function GradingformGuideCommentList({ gradingformGuideComments }: { gradingformGuideComments: CompleteGradingformGuideComment[] }) {
  const { data: g } = trpc.gradingformGuideComments.getGradingformGuideComments.useQuery(undefined, {
    initialData: { gradingformGuideComments },
    refetchOnMount: false,
  });

  if (g.gradingformGuideComments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradingformGuideComments.map((gradingformGuideComment) => (
        <GradingformGuideComment gradingformGuideComment={gradingformGuideComment} key={gradingformGuideComment.id} />
      ))}
    </ul>
  );
}

const GradingformGuideComment = ({ gradingformGuideComment }: { gradingformGuideComment: CompleteGradingformGuideComment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradingformGuideComment.definitionId}</div>
      </div>
      <GradingformGuideCommentModal gradingformGuideComment={gradingformGuideComment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No gradingform guide comments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new gradingform guide comment.
      </p>
      <div className="mt-6">
        <GradingformGuideCommentModal emptyState={true} />
      </div>
    </div>
  );
};

