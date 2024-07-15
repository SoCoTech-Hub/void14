"use client";
import { CompleteQuestionTruefalse } from "@soco/question-db/schema/questionTruefalse";
import { trpc } from "@/lib/trpc/client";
import QuestionTruefalseModal from "./QuestionTruefalseModal";


export default function QuestionTruefalseList({ questionTruefalse }: { questionTruefalse: CompleteQuestionTruefalse[] }) {
  const { data: q } = trpc.questionTruefalse.getQuestionTruefalse.useQuery(undefined, {
    initialData: { questionTruefalse },
    refetchOnMount: false,
  });

  if (q.questionTruefalse.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionTruefalse.map((questionTruefalse) => (
        <QuestionTruefalse questionTruefalse={questionTruefalse} key={questionTruefalse.questionTruefalse.id} />
      ))}
    </ul>
  );
}

const QuestionTruefalse = ({ questionTruefalse }: { questionTruefalse: CompleteQuestionTruefalse }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionTruefalse.questionTruefalse.questionAnswerId}</div>
      </div>
      <QuestionTruefalseModal questionTruefalse={questionTruefalse.questionTruefalse} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question truefalse
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question truefalse.
      </p>
      <div className="mt-6">
        <QuestionTruefalseModal emptyState={true} />
      </div>
    </div>
  );
};

