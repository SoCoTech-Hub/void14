import MnetServiceEnrolCourseList from "@/components/mnetServiceEnrolCourses/MnetServiceEnrolCourseList";
import NewMnetServiceEnrolCourseModal from "@/components/mnetServiceEnrolCourses/MnetServiceEnrolCourseModal";
import { api } from "@/lib/trpc/api";

export default async function MnetServiceEnrolCourses() {
  const { mnetServiceEnrolCourses } = await api.mnetServiceEnrolCourses.getMnetServiceEnrolCourses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mnet Service Enrol Courses</h1>
        <NewMnetServiceEnrolCourseModal />
      </div>
      <MnetServiceEnrolCourseList mnetServiceEnrolCourses={mnetServiceEnrolCourses} />
    </main>
  );
}
