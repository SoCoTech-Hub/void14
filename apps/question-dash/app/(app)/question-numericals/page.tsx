import QuestionNumericalList from "@/components/questionNumericals/QuestionNumericalList";
import NewQuestionNumericalModal from "@/components/questionNumericals/QuestionNumericalModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionNumericals() {
  const { questionNumericals } = await api.questionNumericals.getQuestionNumericals.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Numericals</h1>
        <NewQuestionNumericalModal />
      </div>
      <QuestionNumericalList questionNumericals={questionNumericals} />
    </main>
  );
}
