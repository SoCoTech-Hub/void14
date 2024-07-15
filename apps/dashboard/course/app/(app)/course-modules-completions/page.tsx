import CourseModulesCompletionList from "@/components/courseModulesCompletions/CourseModulesCompletionList";
import NewCourseModulesCompletionModal from "@/components/courseModulesCompletions/CourseModulesCompletionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function CourseModulesCompletions() {
  await checkAuth();
  const { courseModulesCompletions } = await api.courseModulesCompletions.getCourseModulesCompletions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course Modules Completions</h1>
        <NewCourseModulesCompletionModal />
      </div>
      <CourseModulesCompletionList courseModulesCompletions={courseModulesCompletions} />
    </main>
  );
}
