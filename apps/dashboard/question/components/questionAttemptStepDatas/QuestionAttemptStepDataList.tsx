"use client";
import { CompleteQuestionAttemptStepData } from "@/lib/db/schema/questionAttemptStepDatas";
import { trpc } from "@/lib/trpc/client";
import QuestionAttemptStepDataModal from "./QuestionAttemptStepDataModal";


export default function QuestionAttemptStepDataList({ questionAttemptStepDatas }: { questionAttemptStepDatas: CompleteQuestionAttemptStepData[] }) {
  const { data: q } = trpc.questionAttemptStepDatas.getQuestionAttemptStepDatas.useQuery(undefined, {
    initialData: { questionAttemptStepDatas },
    refetchOnMount: false,
  });

  if (q.questionAttemptStepDatas.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionAttemptStepDatas.map((questionAttemptStepData) => (
        <QuestionAttemptStepData questionAttemptStepData={questionAttemptStepData} key={questionAttemptStepData.questionAttemptStepData.id} />
      ))}
    </ul>
  );
}

const QuestionAttemptStepData = ({ questionAttemptStepData }: { questionAttemptStepData: CompleteQuestionAttemptStepData }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionAttemptStepData.questionAttemptStepData.questionAttemptStepId}</div>
      </div>
      <QuestionAttemptStepDataModal questionAttemptStepData={questionAttemptStepData.questionAttemptStepData} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question attempt step datas
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question attempt step data.
      </p>
      <div className="mt-6">
        <QuestionAttemptStepDataModal emptyState={true} />
      </div>
    </div>
  );
};

