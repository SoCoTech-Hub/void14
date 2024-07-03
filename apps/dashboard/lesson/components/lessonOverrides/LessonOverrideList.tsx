"use client";
import { CompleteLessonOverride } from "@/lib/db/schema/lessonOverrides";
import { trpc } from "@/lib/trpc/client";
import LessonOverrideModal from "./LessonOverrideModal";


export default function LessonOverrideList({ lessonOverrides }: { lessonOverrides: CompleteLessonOverride[] }) {
  const { data: l } = trpc.lessonOverrides.getLessonOverrides.useQuery(undefined, {
    initialData: { lessonOverrides },
    refetchOnMount: false,
  });

  if (l.lessonOverrides.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.lessonOverrides.map((lessonOverride) => (
        <LessonOverride lessonOverride={lessonOverride} key={lessonOverride.lessonOverride.id} />
      ))}
    </ul>
  );
}

const LessonOverride = ({ lessonOverride }: { lessonOverride: CompleteLessonOverride }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{lessonOverride.lessonOverride.available.toString()}</div>
      </div>
      <LessonOverrideModal lessonOverride={lessonOverride.lessonOverride} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lesson overrides
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lesson override.
      </p>
      <div className="mt-6">
        <LessonOverrideModal emptyState={true} />
      </div>
    </div>
  );
};

