import CourseCompletionCriteriaList from "@/components/courseCompletionCriterias/CourseCompletionCriteriaList";
import NewCourseCompletionCriteriaModal from "@/components/courseCompletionCriterias/CourseCompletionCriteriaModal";
import { api } from "@/lib/trpc/api";

export default async function CourseCompletionCriterias() {
  const { courseCompletionCriterias } = await api.courseCompletionCriterias.getCourseCompletionCriterias.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course Completion Criterias</h1>
        <NewCourseCompletionCriteriaModal />
      </div>
      <CourseCompletionCriteriaList courseCompletionCriterias={courseCompletionCriterias} />
    </main>
  );
}
