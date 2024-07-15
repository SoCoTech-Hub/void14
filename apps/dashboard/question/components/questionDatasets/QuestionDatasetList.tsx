"use client";
import { CompleteQuestionDataset } from "@soco/question-db/schema/questionDatasets";
import { trpc } from "@/lib/trpc/client";
import QuestionDatasetModal from "./QuestionDatasetModal";


export default function QuestionDatasetList({ questionDatasets }: { questionDatasets: CompleteQuestionDataset[] }) {
  const { data: q } = trpc.questionDatasets.getQuestionDatasets.useQuery(undefined, {
    initialData: { questionDatasets },
    refetchOnMount: false,
  });

  if (q.questionDatasets.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionDatasets.map((questionDataset) => (
        <QuestionDataset questionDataset={questionDataset} key={questionDataset.questionDataset.id} />
      ))}
    </ul>
  );
}

const QuestionDataset = ({ questionDataset }: { questionDataset: CompleteQuestionDataset }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionDataset.questionDataset.questionDatasetDefinitionId}</div>
      </div>
      <QuestionDatasetModal questionDataset={questionDataset.questionDataset} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question datasets
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question dataset.
      </p>
      <div className="mt-6">
        <QuestionDatasetModal emptyState={true} />
      </div>
    </div>
  );
};

