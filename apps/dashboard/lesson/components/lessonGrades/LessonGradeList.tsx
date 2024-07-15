"use client";
import { CompleteLessonGrade } from "@soco/lesson-db/schema/lessonGrades";
import { trpc } from "@/lib/trpc/client";
import LessonGradeModal from "./LessonGradeModal";


export default function LessonGradeList({ lessonGrades }: { lessonGrades: CompleteLessonGrade[] }) {
  const { data: l } = trpc.lessonGrades.getLessonGrades.useQuery(undefined, {
    initialData: { lessonGrades },
    refetchOnMount: false,
  });

  if (l.lessonGrades.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.lessonGrades.map((lessonGrade) => (
        <LessonGrade lessonGrade={lessonGrade} key={lessonGrade.lessonGrade.id} />
      ))}
    </ul>
  );
}

const LessonGrade = ({ lessonGrade }: { lessonGrade: CompleteLessonGrade }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{lessonGrade.lessonGrade.completed.toString()}</div>
      </div>
      <LessonGradeModal lessonGrade={lessonGrade.lessonGrade} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lesson grades
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lesson grade.
      </p>
      <div className="mt-6">
        <LessonGradeModal emptyState={true} />
      </div>
    </div>
  );
};

