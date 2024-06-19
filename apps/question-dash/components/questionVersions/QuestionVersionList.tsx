"use client";
import { CompleteQuestionVersion } from "@/lib/db/schema/questionVersions";
import { trpc } from "@/lib/trpc/client";
import QuestionVersionModal from "./QuestionVersionModal";


export default function QuestionVersionList({ questionVersions }: { questionVersions: CompleteQuestionVersion[] }) {
  const { data: q } = trpc.questionVersions.getQuestionVersions.useQuery(undefined, {
    initialData: { questionVersions },
    refetchOnMount: false,
  });

  if (q.questionVersions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionVersions.map((questionVersion) => (
        <QuestionVersion questionVersion={questionVersion} key={questionVersion.questionVersion.id} />
      ))}
    </ul>
  );
}

const QuestionVersion = ({ questionVersion }: { questionVersion: CompleteQuestionVersion }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionVersion.questionVersion.questionBankEntryId}</div>
      </div>
      <QuestionVersionModal questionVersion={questionVersion.questionVersion} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question versions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question version.
      </p>
      <div className="mt-6">
        <QuestionVersionModal emptyState={true} />
      </div>
    </div>
  );
};

