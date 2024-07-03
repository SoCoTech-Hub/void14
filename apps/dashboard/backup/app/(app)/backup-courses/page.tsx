import BackupCourseList from "@/components/backupCourses/BackupCourseList";
import NewBackupCourseModal from "@/components/backupCourses/BackupCourseModal";
import { api } from "@/lib/trpc/api";

export default async function BackupCourses() {
  const { backupCourses } = await api.backupCourses.getBackupCourses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Backup Courses</h1>
        <NewBackupCourseModal />
      </div>
      <BackupCourseList backupCourses={backupCourses} />
    </main>
  );
}
