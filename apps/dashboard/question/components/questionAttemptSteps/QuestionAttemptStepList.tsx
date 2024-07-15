"use client";
import { CompleteQuestionAttemptStep } from "@soco/question-db/schema/questionAttemptSteps";
import { trpc } from "@/lib/trpc/client";
import QuestionAttemptStepModal from "./QuestionAttemptStepModal";


export default function QuestionAttemptStepList({ questionAttemptSteps }: { questionAttemptSteps: CompleteQuestionAttemptStep[] }) {
  const { data: q } = trpc.questionAttemptSteps.getQuestionAttemptSteps.useQuery(undefined, {
    initialData: { questionAttemptSteps },
    refetchOnMount: false,
  });

  if (q.questionAttemptSteps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionAttemptSteps.map((questionAttemptStep) => (
        <QuestionAttemptStep questionAttemptStep={questionAttemptStep} key={questionAttemptStep.questionAttemptStep.id} />
      ))}
    </ul>
  );
}

const QuestionAttemptStep = ({ questionAttemptStep }: { questionAttemptStep: CompleteQuestionAttemptStep }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionAttemptStep.questionAttemptStep.fraction}</div>
      </div>
      <QuestionAttemptStepModal questionAttemptStep={questionAttemptStep.questionAttemptStep} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question attempt steps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question attempt step.
      </p>
      <div className="mt-6">
        <QuestionAttemptStepModal emptyState={true} />
      </div>
    </div>
  );
};

