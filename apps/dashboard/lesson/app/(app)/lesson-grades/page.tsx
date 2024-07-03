import LessonGradeList from "@/components/lessonGrades/LessonGradeList";
import NewLessonGradeModal from "@/components/lessonGrades/LessonGradeModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function LessonGrades() {
  await checkAuth();
  const { lessonGrades } = await api.lessonGrades.getLessonGrades.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lesson Grades</h1>
        <NewLessonGradeModal />
      </div>
      <LessonGradeList lessonGrades={lessonGrades} />
    </main>
  );
}
