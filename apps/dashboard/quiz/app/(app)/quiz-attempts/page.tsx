import QuizAttemptList from "@/components/quizAttempts/QuizAttemptList";
import NewQuizAttemptModal from "@/components/quizAttempts/QuizAttemptModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function QuizAttempts() {
  await checkAuth();
  const { quizAttempts } = await api.quizAttempts.getQuizAttempts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Quiz Attempts</h1>
        <NewQuizAttemptModal />
      </div>
      <QuizAttemptList quizAttempts={quizAttempts} />
    </main>
  );
}
