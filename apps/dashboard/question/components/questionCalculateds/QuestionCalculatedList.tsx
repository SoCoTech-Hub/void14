"use client";
import { CompleteQuestionCalculated } from "@soco/question-db/schema/questionCalculateds";
import { trpc } from "@/lib/trpc/client";
import QuestionCalculatedModal from "./QuestionCalculatedModal";


export default function QuestionCalculatedList({ questionCalculateds }: { questionCalculateds: CompleteQuestionCalculated[] }) {
  const { data: q } = trpc.questionCalculateds.getQuestionCalculateds.useQuery(undefined, {
    initialData: { questionCalculateds },
    refetchOnMount: false,
  });

  if (q.questionCalculateds.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionCalculateds.map((questionCalculated) => (
        <QuestionCalculated questionCalculated={questionCalculated} key={questionCalculated.questionCalculated.id} />
      ))}
    </ul>
  );
}

const QuestionCalculated = ({ questionCalculated }: { questionCalculated: CompleteQuestionCalculated }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionCalculated.questionCalculated.questionAnswerId}</div>
      </div>
      <QuestionCalculatedModal questionCalculated={questionCalculated.questionCalculated} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question calculateds
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question calculated.
      </p>
      <div className="mt-6">
        <QuestionCalculatedModal emptyState={true} />
      </div>
    </div>
  );
};

