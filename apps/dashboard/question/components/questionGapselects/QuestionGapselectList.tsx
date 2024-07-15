"use client";
import { CompleteQuestionGapselect } from "@soco/question-db/schema/questionGapselects";
import { trpc } from "@/lib/trpc/client";
import QuestionGapselectModal from "./QuestionGapselectModal";


export default function QuestionGapselectList({ questionGapselects }: { questionGapselects: CompleteQuestionGapselect[] }) {
  const { data: q } = trpc.questionGapselects.getQuestionGapselects.useQuery(undefined, {
    initialData: { questionGapselects },
    refetchOnMount: false,
  });

  if (q.questionGapselects.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionGapselects.map((questionGapselect) => (
        <QuestionGapselect questionGapselect={questionGapselect} key={questionGapselect.questionGapselect.id} />
      ))}
    </ul>
  );
}

const QuestionGapselect = ({ questionGapselect }: { questionGapselect: CompleteQuestionGapselect }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionGapselect.questionGapselect.correctFeedback}</div>
      </div>
      <QuestionGapselectModal questionGapselect={questionGapselect.questionGapselect} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question gapselects
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question gapselect.
      </p>
      <div className="mt-6">
        <QuestionGapselectModal emptyState={true} />
      </div>
    </div>
  );
};

