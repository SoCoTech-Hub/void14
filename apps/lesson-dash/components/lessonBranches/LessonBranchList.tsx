"use client";
import { CompleteLessonBranch } from "@/lib/db/schema/lessonBranches";
import { trpc } from "@/lib/trpc/client";
import LessonBranchModal from "./LessonBranchModal";


export default function LessonBranchList({ lessonBranches }: { lessonBranches: CompleteLessonBranch[] }) {
  const { data: l } = trpc.lessonBranches.getLessonBranches.useQuery(undefined, {
    initialData: { lessonBranches },
    refetchOnMount: false,
  });

  if (l.lessonBranches.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.lessonBranches.map((lessonBranch) => (
        <LessonBranch lessonBranch={lessonBranch} key={lessonBranch.lessonBranch.id} />
      ))}
    </ul>
  );
}

const LessonBranch = ({ lessonBranch }: { lessonBranch: CompleteLessonBranch }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{lessonBranch.lessonBranch.flag}</div>
      </div>
      <LessonBranchModal lessonBranch={lessonBranch.lessonBranch} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lesson branches
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lesson branch.
      </p>
      <div className="mt-6">
        <LessonBranchModal emptyState={true} />
      </div>
    </div>
  );
};

