import CourseModuleList from "@/components/courseModules/CourseModuleList";
import NewCourseModuleModal from "@/components/courseModules/CourseModuleModal";
import { api } from "@/lib/trpc/api";

export default async function CourseModules() {
  const { courseModules } = await api.courseModules.getCourseModules.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course Modules</h1>
        <NewCourseModuleModal />
      </div>
      <CourseModuleList courseModules={courseModules} />
    </main>
  );
}
