"use client";
import { CompleteQuestionSetReference } from "@/lib/db/schema/questionSetReferences";
import { trpc } from "@/lib/trpc/client";
import QuestionSetReferenceModal from "./QuestionSetReferenceModal";


export default function QuestionSetReferenceList({ questionSetReferences }: { questionSetReferences: CompleteQuestionSetReference[] }) {
  const { data: q } = trpc.questionSetReferences.getQuestionSetReferences.useQuery(undefined, {
    initialData: { questionSetReferences },
    refetchOnMount: false,
  });

  if (q.questionSetReferences.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionSetReferences.map((questionSetReference) => (
        <QuestionSetReference questionSetReference={questionSetReference} key={questionSetReference.id} />
      ))}
    </ul>
  );
}

const QuestionSetReference = ({ questionSetReference }: { questionSetReference: CompleteQuestionSetReference }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionSetReference.component}</div>
      </div>
      <QuestionSetReferenceModal questionSetReference={questionSetReference} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question set references
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question set reference.
      </p>
      <div className="mt-6">
        <QuestionSetReferenceModal emptyState={true} />
      </div>
    </div>
  );
};

