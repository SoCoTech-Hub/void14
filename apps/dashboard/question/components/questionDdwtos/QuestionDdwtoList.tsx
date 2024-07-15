"use client";
import { CompleteQuestionDdwto } from "@soco/question-db/schema/questionDdwtos";
import { trpc } from "@/lib/trpc/client";
import QuestionDdwtoModal from "./QuestionDdwtoModal";


export default function QuestionDdwtoList({ questionDdwtos }: { questionDdwtos: CompleteQuestionDdwto[] }) {
  const { data: q } = trpc.questionDdwtos.getQuestionDdwtos.useQuery(undefined, {
    initialData: { questionDdwtos },
    refetchOnMount: false,
  });

  if (q.questionDdwtos.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionDdwtos.map((questionDdwto) => (
        <QuestionDdwto questionDdwto={questionDdwto} key={questionDdwto.questionDdwto.id} />
      ))}
    </ul>
  );
}

const QuestionDdwto = ({ questionDdwto }: { questionDdwto: CompleteQuestionDdwto }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionDdwto.questionDdwto.correctFeedback}</div>
      </div>
      <QuestionDdwtoModal questionDdwto={questionDdwto.questionDdwto} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question ddwtos
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question ddwto.
      </p>
      <div className="mt-6">
        <QuestionDdwtoModal emptyState={true} />
      </div>
    </div>
  );
};

