import GradeOutcomesCourseList from "@/components/gradeOutcomesCourses/GradeOutcomesCourseList";
import NewGradeOutcomesCourseModal from "@/components/gradeOutcomesCourses/GradeOutcomesCourseModal";
import { api } from "@/lib/trpc/api";

export default async function GradeOutcomesCourses() {
  const { gradeOutcomesCourses } = await api.gradeOutcomesCourses.getGradeOutcomesCourses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grade Outcomes Courses</h1>
        <NewGradeOutcomesCourseModal />
      </div>
      <GradeOutcomesCourseList gradeOutcomesCourses={gradeOutcomesCourses} />
    </main>
  );
}
