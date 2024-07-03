"use client";
import { CompleteQuestionCalculatedOption } from "@/lib/db/schema/questionCalculatedOptions";
import { trpc } from "@/lib/trpc/client";
import QuestionCalculatedOptionModal from "./QuestionCalculatedOptionModal";


export default function QuestionCalculatedOptionList({ questionCalculatedOptions }: { questionCalculatedOptions: CompleteQuestionCalculatedOption[] }) {
  const { data: q } = trpc.questionCalculatedOptions.getQuestionCalculatedOptions.useQuery(undefined, {
    initialData: { questionCalculatedOptions },
    refetchOnMount: false,
  });

  if (q.questionCalculatedOptions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionCalculatedOptions.map((questionCalculatedOption) => (
        <QuestionCalculatedOption questionCalculatedOption={questionCalculatedOption} key={questionCalculatedOption.questionCalculatedOption.id} />
      ))}
    </ul>
  );
}

const QuestionCalculatedOption = ({ questionCalculatedOption }: { questionCalculatedOption: CompleteQuestionCalculatedOption }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionCalculatedOption.questionCalculatedOption.answerNumbering}</div>
      </div>
      <QuestionCalculatedOptionModal questionCalculatedOption={questionCalculatedOption.questionCalculatedOption} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question calculated options
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question calculated option.
      </p>
      <div className="mt-6">
        <QuestionCalculatedOptionModal emptyState={true} />
      </div>
    </div>
  );
};

