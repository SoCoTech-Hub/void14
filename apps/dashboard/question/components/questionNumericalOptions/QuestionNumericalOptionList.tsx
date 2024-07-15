"use client";
import { CompleteQuestionNumericalOption } from "@soco/question-db/schema/questionNumericalOptions";
import { trpc } from "@/lib/trpc/client";
import QuestionNumericalOptionModal from "./QuestionNumericalOptionModal";


export default function QuestionNumericalOptionList({ questionNumericalOptions }: { questionNumericalOptions: CompleteQuestionNumericalOption[] }) {
  const { data: q } = trpc.questionNumericalOptions.getQuestionNumericalOptions.useQuery(undefined, {
    initialData: { questionNumericalOptions },
    refetchOnMount: false,
  });

  if (q.questionNumericalOptions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionNumericalOptions.map((questionNumericalOption) => (
        <QuestionNumericalOption questionNumericalOption={questionNumericalOption} key={questionNumericalOption.questionNumericalOption.id} />
      ))}
    </ul>
  );
}

const QuestionNumericalOption = ({ questionNumericalOption }: { questionNumericalOption: CompleteQuestionNumericalOption }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionNumericalOption.questionNumericalOption.questionId}</div>
      </div>
      <QuestionNumericalOptionModal questionNumericalOption={questionNumericalOption.questionNumericalOption} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question numerical options
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question numerical option.
      </p>
      <div className="mt-6">
        <QuestionNumericalOptionModal emptyState={true} />
      </div>
    </div>
  );
};

