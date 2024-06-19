import QuestionAnswerList from "@/components/questionAnswers/QuestionAnswerList";
import NewQuestionAnswerModal from "@/components/questionAnswers/QuestionAnswerModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionAnswers() {
  const { questionAnswers } = await api.questionAnswers.getQuestionAnswers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Answers</h1>
        <NewQuestionAnswerModal />
      </div>
      <QuestionAnswerList questionAnswers={questionAnswers} />
    </main>
  );
}
