import QuestionGapselectList from "@/components/questionGapselects/QuestionGapselectList";
import NewQuestionGapselectModal from "@/components/questionGapselects/QuestionGapselectModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionGapselects() {
  const { questionGapselects } = await api.questionGapselects.getQuestionGapselects.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Gapselects</h1>
        <NewQuestionGapselectModal />
      </div>
      <QuestionGapselectList questionGapselects={questionGapselects} />
    </main>
  );
}
