"use client";
import { CompleteLessonAttempt } from "@soco/lesson-db/schema/lessonAttempts";
import { trpc } from "@/lib/trpc/client";
import LessonAttemptModal from "./LessonAttemptModal";


export default function LessonAttemptList({ lessonAttempts }: { lessonAttempts: CompleteLessonAttempt[] }) {
  const { data: l } = trpc.lessonAttempts.getLessonAttempts.useQuery(undefined, {
    initialData: { lessonAttempts },
    refetchOnMount: false,
  });

  if (l.lessonAttempts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.lessonAttempts.map((lessonAttempt) => (
        <LessonAttempt lessonAttempt={lessonAttempt} key={lessonAttempt.lessonAttempt.id} />
      ))}
    </ul>
  );
}

const LessonAttempt = ({ lessonAttempt }: { lessonAttempt: CompleteLessonAttempt }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{lessonAttempt.lessonAttempt.lessonAnswerId}</div>
      </div>
      <LessonAttemptModal lessonAttempt={lessonAttempt.lessonAttempt} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lesson attempts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lesson attempt.
      </p>
      <div className="mt-6">
        <LessonAttemptModal emptyState={true} />
      </div>
    </div>
  );
};

