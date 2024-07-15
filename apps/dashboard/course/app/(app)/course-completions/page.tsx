import CourseCompletionList from "@/components/courseCompletions/CourseCompletionList";
import NewCourseCompletionModal from "@/components/courseCompletions/CourseCompletionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function CourseCompletions() {
  await checkAuth();
  const { courseCompletions } = await api.courseCompletions.getCourseCompletions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course Completions</h1>
        <NewCourseCompletionModal />
      </div>
      <CourseCompletionList courseCompletions={courseCompletions} />
    </main>
  );
}
