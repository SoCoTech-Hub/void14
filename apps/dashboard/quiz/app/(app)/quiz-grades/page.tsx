import QuizGradeList from "@/components/quizGrades/QuizGradeList";
import NewQuizGradeModal from "@/components/quizGrades/QuizGradeModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function QuizGrades() {
  await checkAuth();
  const { quizGrades } = await api.quizGrades.getQuizGrades.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Quiz Grades</h1>
        <NewQuizGradeModal />
      </div>
      <QuizGradeList quizGrades={quizGrades} />
    </main>
  );
}
