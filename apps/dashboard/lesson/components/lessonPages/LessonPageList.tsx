"use client";
import { CompleteLessonPage } from "@soco/lesson-db/schema/lessonPages";
import { trpc } from "@/lib/trpc/client";
import LessonPageModal from "./LessonPageModal";


export default function LessonPageList({ lessonPages }: { lessonPages: CompleteLessonPage[] }) {
  const { data: l } = trpc.lessonPages.getLessonPages.useQuery(undefined, {
    initialData: { lessonPages },
    refetchOnMount: false,
  });

  if (l.lessonPages.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.lessonPages.map((lessonPage) => (
        <LessonPage lessonPage={lessonPage} key={lessonPage.id} />
      ))}
    </ul>
  );
}

const LessonPage = ({ lessonPage }: { lessonPage: CompleteLessonPage }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{lessonPage.contents}</div>
      </div>
      <LessonPageModal lessonPage={lessonPage} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lesson pages
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lesson page.
      </p>
      <div className="mt-6">
        <LessonPageModal emptyState={true} />
      </div>
    </div>
  );
};

