"use client";
import { CompleteQuestionResponseAnalysise } from "@/lib/db/schema/questionResponseAnalysises";
import { trpc } from "@/lib/trpc/client";
import QuestionResponseAnalysiseModal from "./QuestionResponseAnalysiseModal";


export default function QuestionResponseAnalysiseList({ questionResponseAnalysises }: { questionResponseAnalysises: CompleteQuestionResponseAnalysise[] }) {
  const { data: q } = trpc.questionResponseAnalysises.getQuestionResponseAnalysises.useQuery(undefined, {
    initialData: { questionResponseAnalysises },
    refetchOnMount: false,
  });

  if (q.questionResponseAnalysises.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionResponseAnalysises.map((questionResponseAnalysise) => (
        <QuestionResponseAnalysise questionResponseAnalysise={questionResponseAnalysise} key={questionResponseAnalysise.questionResponseAnalysise.id} />
      ))}
    </ul>
  );
}

const QuestionResponseAnalysise = ({ questionResponseAnalysise }: { questionResponseAnalysise: CompleteQuestionResponseAnalysise }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionResponseAnalysise.questionResponseAnalysise.aId}</div>
      </div>
      <QuestionResponseAnalysiseModal questionResponseAnalysise={questionResponseAnalysise.questionResponseAnalysise} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question response analysises
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question response analysise.
      </p>
      <div className="mt-6">
        <QuestionResponseAnalysiseModal emptyState={true} />
      </div>
    </div>
  );
};

