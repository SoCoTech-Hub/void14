"use client";
import { CompleteQuestionDatasetDefinition } from "@/lib/db/schema/questionDatasetDefinitions";
import { trpc } from "@/lib/trpc/client";
import QuestionDatasetDefinitionModal from "./QuestionDatasetDefinitionModal";


export default function QuestionDatasetDefinitionList({ questionDatasetDefinitions }: { questionDatasetDefinitions: CompleteQuestionDatasetDefinition[] }) {
  const { data: q } = trpc.questionDatasetDefinitions.getQuestionDatasetDefinitions.useQuery(undefined, {
    initialData: { questionDatasetDefinitions },
    refetchOnMount: false,
  });

  if (q.questionDatasetDefinitions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionDatasetDefinitions.map((questionDatasetDefinition) => (
        <QuestionDatasetDefinition questionDatasetDefinition={questionDatasetDefinition} key={questionDatasetDefinition.questionDatasetDefinition.id} />
      ))}
    </ul>
  );
}

const QuestionDatasetDefinition = ({ questionDatasetDefinition }: { questionDatasetDefinition: CompleteQuestionDatasetDefinition }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionDatasetDefinition.questionDatasetDefinition.questionCategoryId}</div>
      </div>
      <QuestionDatasetDefinitionModal questionDatasetDefinition={questionDatasetDefinition.questionDatasetDefinition} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question dataset definitions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question dataset definition.
      </p>
      <div className="mt-6">
        <QuestionDatasetDefinitionModal emptyState={true} />
      </div>
    </div>
  );
};

