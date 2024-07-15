"use client";
import { CompleteQuestionNumerical } from "@soco/question-db/schema/questionNumericals";
import { trpc } from "@/lib/trpc/client";
import QuestionNumericalModal from "./QuestionNumericalModal";


export default function QuestionNumericalList({ questionNumericals }: { questionNumericals: CompleteQuestionNumerical[] }) {
  const { data: q } = trpc.questionNumericals.getQuestionNumericals.useQuery(undefined, {
    initialData: { questionNumericals },
    refetchOnMount: false,
  });

  if (q.questionNumericals.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionNumericals.map((questionNumerical) => (
        <QuestionNumerical questionNumerical={questionNumerical} key={questionNumerical.questionNumerical.id} />
      ))}
    </ul>
  );
}

const QuestionNumerical = ({ questionNumerical }: { questionNumerical: CompleteQuestionNumerical }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionNumerical.questionNumerical.questionAnswerId}</div>
      </div>
      <QuestionNumericalModal questionNumerical={questionNumerical.questionNumerical} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question numericals
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question numerical.
      </p>
      <div className="mt-6">
        <QuestionNumericalModal emptyState={true} />
      </div>
    </div>
  );
};

