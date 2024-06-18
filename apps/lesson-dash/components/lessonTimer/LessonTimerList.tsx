"use client";
import { CompleteLessonTimer } from "@/lib/db/schema/lessonTimer";
import { trpc } from "@/lib/trpc/client";
import LessonTimerModal from "./LessonTimerModal";


export default function LessonTimerList({ lessonTimer }: { lessonTimer: CompleteLessonTimer[] }) {
  const { data: l } = trpc.lessonTimer.getLessonTimer.useQuery(undefined, {
    initialData: { lessonTimer },
    refetchOnMount: false,
  });

  if (l.lessonTimer.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.lessonTimer.map((lessonTimer) => (
        <LessonTimer lessonTimer={lessonTimer} key={lessonTimer.lessonTimer.id} />
      ))}
    </ul>
  );
}

const LessonTimer = ({ lessonTimer }: { lessonTimer: CompleteLessonTimer }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{lessonTimer.lessonTimer.completed}</div>
      </div>
      <LessonTimerModal lessonTimer={lessonTimer.lessonTimer} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lesson timer
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lesson timer.
      </p>
      <div className="mt-6">
        <LessonTimerModal emptyState={true} />
      </div>
    </div>
  );
};

