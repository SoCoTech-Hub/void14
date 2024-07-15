"use client";
import { CompleteLesson } from "@soco/lesson-db/schema/lessons";
import { trpc } from "@/lib/trpc/client";
import LessonModal from "./LessonModal";


export default function LessonList({ lessons }: { lessons: CompleteLesson[] }) {
  const { data: l } = trpc.lessons.getLessons.useQuery(undefined, {
    initialData: { lessons },
    refetchOnMount: false,
  });

  if (l.lessons.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.lessons.map((lesson) => (
        <Lesson lesson={lesson} key={lesson.id} />
      ))}
    </ul>
  );
}

const Lesson = ({ lesson }: { lesson: CompleteLesson }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{lesson.activityLink}</div>
      </div>
      <LessonModal lesson={lesson} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lessons
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lesson.
      </p>
      <div className="mt-6">
        <LessonModal emptyState={true} />
      </div>
    </div>
  );
};

