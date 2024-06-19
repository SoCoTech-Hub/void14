import QuestionTruefalseList from "@/components/questionTruefalse/QuestionTruefalseList";
import NewQuestionTruefalseModal from "@/components/questionTruefalse/QuestionTruefalseModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionTruefalse() {
  const { questionTruefalse } = await api.questionTruefalse.getQuestionTruefalse.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Truefalse</h1>
        <NewQuestionTruefalseModal />
      </div>
      <QuestionTruefalseList questionTruefalse={questionTruefalse} />
    </main>
  );
}
