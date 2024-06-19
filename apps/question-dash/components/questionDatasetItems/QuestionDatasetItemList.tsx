"use client";
import { CompleteQuestionDatasetItem } from "@/lib/db/schema/questionDatasetItems";
import { trpc } from "@/lib/trpc/client";
import QuestionDatasetItemModal from "./QuestionDatasetItemModal";


export default function QuestionDatasetItemList({ questionDatasetItems }: { questionDatasetItems: CompleteQuestionDatasetItem[] }) {
  const { data: q } = trpc.questionDatasetItems.getQuestionDatasetItems.useQuery(undefined, {
    initialData: { questionDatasetItems },
    refetchOnMount: false,
  });

  if (q.questionDatasetItems.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionDatasetItems.map((questionDatasetItem) => (
        <QuestionDatasetItem questionDatasetItem={questionDatasetItem} key={questionDatasetItem.questionDatasetItem.id} />
      ))}
    </ul>
  );
}

const QuestionDatasetItem = ({ questionDatasetItem }: { questionDatasetItem: CompleteQuestionDatasetItem }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionDatasetItem.questionDatasetItem.questionDatasetDefinitionId}</div>
      </div>
      <QuestionDatasetItemModal questionDatasetItem={questionDatasetItem.questionDatasetItem} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question dataset items
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question dataset item.
      </p>
      <div className="mt-6">
        <QuestionDatasetItemModal emptyState={true} />
      </div>
    </div>
  );
};

