import QuestionAttemptStepList from "@/components/questionAttemptSteps/QuestionAttemptStepList";
import NewQuestionAttemptStepModal from "@/components/questionAttemptSteps/QuestionAttemptStepModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function QuestionAttemptSteps() {
  await checkAuth();
  const { questionAttemptSteps } = await api.questionAttemptSteps.getQuestionAttemptSteps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Attempt Steps</h1>
        <NewQuestionAttemptStepModal />
      </div>
      <QuestionAttemptStepList questionAttemptSteps={questionAttemptSteps} />
    </main>
  );
}
