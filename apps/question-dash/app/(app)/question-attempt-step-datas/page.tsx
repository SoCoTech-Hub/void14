import QuestionAttemptStepDataList from "@/components/questionAttemptStepDatas/QuestionAttemptStepDataList";
import NewQuestionAttemptStepDataModal from "@/components/questionAttemptStepDatas/QuestionAttemptStepDataModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionAttemptStepDatas() {
  const { questionAttemptStepDatas } = await api.questionAttemptStepDatas.getQuestionAttemptStepDatas.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Attempt Step Datas</h1>
        <NewQuestionAttemptStepDataModal />
      </div>
      <QuestionAttemptStepDataList questionAttemptStepDatas={questionAttemptStepDatas} />
    </main>
  );
}
