import CourseCompletionAggrMethdList from "@/components/courseCompletionAggrMethds/CourseCompletionAggrMethdList";
import NewCourseCompletionAggrMethdModal from "@/components/courseCompletionAggrMethds/CourseCompletionAggrMethdModal";
import { api } from "@/lib/trpc/api";

export default async function CourseCompletionAggrMethds() {
  const { courseCompletionAggrMethds } = await api.courseCompletionAggrMethds.getCourseCompletionAggrMethds.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course Completion Aggr Methds</h1>
        <NewCourseCompletionAggrMethdModal />
      </div>
      <CourseCompletionAggrMethdList courseCompletionAggrMethds={courseCompletionAggrMethds} />
    </main>
  );
}
