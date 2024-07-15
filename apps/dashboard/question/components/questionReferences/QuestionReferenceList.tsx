"use client";
import { CompleteQuestionReference } from "@soco/question-db/schema/questionReferences";
import { trpc } from "@/lib/trpc/client";
import QuestionReferenceModal from "./QuestionReferenceModal";


export default function QuestionReferenceList({ questionReferences }: { questionReferences: CompleteQuestionReference[] }) {
  const { data: q } = trpc.questionReferences.getQuestionReferences.useQuery(undefined, {
    initialData: { questionReferences },
    refetchOnMount: false,
  });

  if (q.questionReferences.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionReferences.map((questionReference) => (
        <QuestionReference questionReference={questionReference} key={questionReference.questionReference.id} />
      ))}
    </ul>
  );
}

const QuestionReference = ({ questionReference }: { questionReference: CompleteQuestionReference }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionReference.questionReference.component}</div>
      </div>
      <QuestionReferenceModal questionReference={questionReference.questionReference} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question references
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question reference.
      </p>
      <div className="mt-6">
        <QuestionReferenceModal emptyState={true} />
      </div>
    </div>
  );
};

