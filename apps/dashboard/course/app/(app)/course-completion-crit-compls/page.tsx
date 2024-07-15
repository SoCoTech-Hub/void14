import CourseCompletionCritComplList from "@/components/courseCompletionCritCompls/CourseCompletionCritComplList";
import NewCourseCompletionCritComplModal from "@/components/courseCompletionCritCompls/CourseCompletionCritComplModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function CourseCompletionCritCompls() {
  await checkAuth();
  const { courseCompletionCritCompls } = await api.courseCompletionCritCompls.getCourseCompletionCritCompls.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course Completion Crit Compls</h1>
        <NewCourseCompletionCritComplModal />
      </div>
      <CourseCompletionCritComplList courseCompletionCritCompls={courseCompletionCritCompls} />
    </main>
  );
}
