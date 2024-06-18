import QuizFeedbackList from "@/components/quizFeedbacks/QuizFeedbackList";
import NewQuizFeedbackModal from "@/components/quizFeedbacks/QuizFeedbackModal";
import { api } from "@/lib/trpc/api";

export default async function QuizFeedbacks() {
  const { quizFeedbacks } = await api.quizFeedbacks.getQuizFeedbacks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Quiz Feedbacks</h1>
        <NewQuizFeedbackModal />
      </div>
      <QuizFeedbackList quizFeedbacks={quizFeedbacks} />
    </main>
  );
}
