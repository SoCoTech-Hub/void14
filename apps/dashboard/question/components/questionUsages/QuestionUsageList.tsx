"use client";
import { CompleteQuestionUsage } from "@soco/question-db/schema/questionUsages";
import { trpc } from "@/lib/trpc/client";
import QuestionUsageModal from "./QuestionUsageModal";


export default function QuestionUsageList({ questionUsages }: { questionUsages: CompleteQuestionUsage[] }) {
  const { data: q } = trpc.questionUsages.getQuestionUsages.useQuery(undefined, {
    initialData: { questionUsages },
    refetchOnMount: false,
  });

  if (q.questionUsages.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionUsages.map((questionUsage) => (
        <QuestionUsage questionUsage={questionUsage} key={questionUsage.id} />
      ))}
    </ul>
  );
}

const QuestionUsage = ({ questionUsage }: { questionUsage: CompleteQuestionUsage }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionUsage.component}</div>
      </div>
      <QuestionUsageModal questionUsage={questionUsage} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question usages
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question usage.
      </p>
      <div className="mt-6">
        <QuestionUsageModal emptyState={true} />
      </div>
    </div>
  );
};

