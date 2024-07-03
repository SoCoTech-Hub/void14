import QuestionAttemptList from "@/components/questionAttempts/QuestionAttemptList";
import NewQuestionAttemptModal from "@/components/questionAttempts/QuestionAttemptModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionAttempts() {
  const { questionAttempts } = await api.questionAttempts.getQuestionAttempts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Attempts</h1>
        <NewQuestionAttemptModal />
      </div>
      <QuestionAttemptList questionAttempts={questionAttempts} />
    </main>
  );
}
