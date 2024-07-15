"use client";
import { CompleteQuestionResponseCount } from "@soco/question-db/schema/questionResponseCounts";
import { trpc } from "@/lib/trpc/client";
import QuestionResponseCountModal from "./QuestionResponseCountModal";


export default function QuestionResponseCountList({ questionResponseCounts }: { questionResponseCounts: CompleteQuestionResponseCount[] }) {
  const { data: q } = trpc.questionResponseCounts.getQuestionResponseCounts.useQuery(undefined, {
    initialData: { questionResponseCounts },
    refetchOnMount: false,
  });

  if (q.questionResponseCounts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionResponseCounts.map((questionResponseCount) => (
        <QuestionResponseCount questionResponseCount={questionResponseCount} key={questionResponseCount.questionResponseCount.id} />
      ))}
    </ul>
  );
}

const QuestionResponseCount = ({ questionResponseCount }: { questionResponseCount: CompleteQuestionResponseCount }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionResponseCount.questionResponseCount.questionResponseAnalysiseId}</div>
      </div>
      <QuestionResponseCountModal questionResponseCount={questionResponseCount.questionResponseCount} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question response counts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question response count.
      </p>
      <div className="mt-6">
        <QuestionResponseCountModal emptyState={true} />
      </div>
    </div>
  );
};

