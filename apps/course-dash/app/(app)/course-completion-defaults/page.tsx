import CourseCompletionDefaultList from "@/components/courseCompletionDefaults/CourseCompletionDefaultList";
import NewCourseCompletionDefaultModal from "@/components/courseCompletionDefaults/CourseCompletionDefaultModal";
import { api } from "@/lib/trpc/api";

export default async function CourseCompletionDefaults() {
  const { courseCompletionDefaults } = await api.courseCompletionDefaults.getCourseCompletionDefaults.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course Completion Defaults</h1>
        <NewCourseCompletionDefaultModal />
      </div>
      <CourseCompletionDefaultList courseCompletionDefaults={courseCompletionDefaults} />
    </main>
  );
}
