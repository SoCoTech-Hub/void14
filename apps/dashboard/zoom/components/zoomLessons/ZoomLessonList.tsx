"use client";
import { CompleteZoomLesson } from "@soco/zoom-db/schema/zoomLessons";
import { trpc } from "@/lib/trpc/client";
import ZoomLessonModal from "./ZoomLessonModal";


export default function ZoomLessonList({ zoomLessons }: { zoomLessons: CompleteZoomLesson[] }) {
  const { data: z } = trpc.zoomLessons.getZoomLessons.useQuery(undefined, {
    initialData: { zoomLessons },
    refetchOnMount: false,
  });

  if (z.zoomLessons.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {z.zoomLessons.map((zoomLesson) => (
        <ZoomLesson zoomLesson={zoomLesson} key={zoomLesson.id} />
      ))}
    </ul>
  );
}

const ZoomLesson = ({ zoomLesson }: { zoomLesson: CompleteZoomLesson }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{zoomLesson.active}</div>
        <div>{zoomLesson.courseId}</div>
      </div>
      <ZoomLessonModal zoomLesson={zoomLesson} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No zoom lessons
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new zoom lesson.
      </p>
      <div className="mt-6">
        <ZoomLessonModal emptyState={true} />
      </div>
    </div>
  );
};

