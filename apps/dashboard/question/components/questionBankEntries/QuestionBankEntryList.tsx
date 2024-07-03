"use client";
import { CompleteQuestionBankEntry } from "@/lib/db/schema/questionBankEntries";
import { trpc } from "@/lib/trpc/client";
import QuestionBankEntryModal from "./QuestionBankEntryModal";


export default function QuestionBankEntryList({ questionBankEntries }: { questionBankEntries: CompleteQuestionBankEntry[] }) {
  const { data: q } = trpc.questionBankEntries.getQuestionBankEntries.useQuery(undefined, {
    initialData: { questionBankEntries },
    refetchOnMount: false,
  });

  if (q.questionBankEntries.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionBankEntries.map((questionBankEntry) => (
        <QuestionBankEntry questionBankEntry={questionBankEntry} key={questionBankEntry.questionBankEntry.id} />
      ))}
    </ul>
  );
}

const QuestionBankEntry = ({ questionBankEntry }: { questionBankEntry: CompleteQuestionBankEntry }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionBankEntry.questionBankEntry.idNumber}</div>
      </div>
      <QuestionBankEntryModal questionBankEntry={questionBankEntry.questionBankEntry} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question bank entries
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question bank entry.
      </p>
      <div className="mt-6">
        <QuestionBankEntryModal emptyState={true} />
      </div>
    </div>
  );
};

