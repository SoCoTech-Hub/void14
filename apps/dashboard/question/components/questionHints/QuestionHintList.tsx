"use client";
import { CompleteQuestionHint } from "@soco/question-db/schema/questionHints";
import { trpc } from "@/lib/trpc/client";
import QuestionHintModal from "./QuestionHintModal";


export default function QuestionHintList({ questionHints }: { questionHints: CompleteQuestionHint[] }) {
  const { data: q } = trpc.questionHints.getQuestionHints.useQuery(undefined, {
    initialData: { questionHints },
    refetchOnMount: false,
  });

  if (q.questionHints.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionHints.map((questionHint) => (
        <QuestionHint questionHint={questionHint} key={questionHint.questionHint.id} />
      ))}
    </ul>
  );
}

const QuestionHint = ({ questionHint }: { questionHint: CompleteQuestionHint }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionHint.questionHint.clearWrong}</div>
      </div>
      <QuestionHintModal questionHint={questionHint.questionHint} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question hints
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question hint.
      </p>
      <div className="mt-6">
        <QuestionHintModal emptyState={true} />
      </div>
    </div>
  );
};

