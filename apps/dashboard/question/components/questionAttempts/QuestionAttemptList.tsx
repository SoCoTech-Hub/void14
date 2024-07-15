"use client";
import { CompleteQuestionAttempt } from "@soco/question-db/schema/questionAttempts";
import { trpc } from "@/lib/trpc/client";
import QuestionAttemptModal from "./QuestionAttemptModal";


export default function QuestionAttemptList({ questionAttempts }: { questionAttempts: CompleteQuestionAttempt[] }) {
  const { data: q } = trpc.questionAttempts.getQuestionAttempts.useQuery(undefined, {
    initialData: { questionAttempts },
    refetchOnMount: false,
  });

  if (q.questionAttempts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionAttempts.map((questionAttempt) => (
        <QuestionAttempt questionAttempt={questionAttempt} key={questionAttempt.questionAttempt.id} />
      ))}
    </ul>
  );
}

const QuestionAttempt = ({ questionAttempt }: { questionAttempt: CompleteQuestionAttempt }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionAttempt.questionAttempt.behaviour}</div>
      </div>
      <QuestionAttemptModal questionAttempt={questionAttempt.questionAttempt} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question attempts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question attempt.
      </p>
      <div className="mt-6">
        <QuestionAttemptModal emptyState={true} />
      </div>
    </div>
  );
};

