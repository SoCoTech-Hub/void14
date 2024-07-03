"use client";
import { CompleteGradeLetter } from "@/lib/db/schema/gradeLetters";
import { trpc } from "@/lib/trpc/client";
import GradeLetterModal from "./GradeLetterModal";


export default function GradeLetterList({ gradeLetters }: { gradeLetters: CompleteGradeLetter[] }) {
  const { data: g } = trpc.gradeLetters.getGradeLetters.useQuery(undefined, {
    initialData: { gradeLetters },
    refetchOnMount: false,
  });

  if (g.gradeLetters.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradeLetters.map((gradeLetter) => (
        <GradeLetter gradeLetter={gradeLetter} key={gradeLetter.id} />
      ))}
    </ul>
  );
}

const GradeLetter = ({ gradeLetter }: { gradeLetter: CompleteGradeLetter }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradeLetter.contextId}</div>
      </div>
      <GradeLetterModal gradeLetter={gradeLetter} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grade letters
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade letter.
      </p>
      <div className="mt-6">
        <GradeLetterModal emptyState={true} />
      </div>
    </div>
  );
};

