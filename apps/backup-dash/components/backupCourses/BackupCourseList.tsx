"use client";
import { CompleteBackupCourse } from "@/lib/db/schema/backupCourses";
import { trpc } from "@/lib/trpc/client";
import BackupCourseModal from "./BackupCourseModal";


export default function BackupCourseList({ backupCourses }: { backupCourses: CompleteBackupCourse[] }) {
  const { data: b } = trpc.backupCourses.getBackupCourses.useQuery(undefined, {
    initialData: { backupCourses },
    refetchOnMount: false,
  });

  if (b.backupCourses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.backupCourses.map((backupCourse) => (
        <BackupCourse backupCourse={backupCourse} key={backupCourse.id} />
      ))}
    </ul>
  );
}

const BackupCourse = ({ backupCourse }: { backupCourse: CompleteBackupCourse }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{backupCourse.courseId}</div>
      </div>
      <BackupCourseModal backupCourse={backupCourse} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No backup courses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new backup course.
      </p>
      <div className="mt-6">
        <BackupCourseModal emptyState={true} />
      </div>
    </div>
  );
};

