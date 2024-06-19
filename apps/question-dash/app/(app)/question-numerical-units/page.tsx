import QuestionNumericalUnitList from "@/components/questionNumericalUnits/QuestionNumericalUnitList";
import NewQuestionNumericalUnitModal from "@/components/questionNumericalUnits/QuestionNumericalUnitModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionNumericalUnits() {
  const { questionNumericalUnits } = await api.questionNumericalUnits.getQuestionNumericalUnits.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Numerical Units</h1>
        <NewQuestionNumericalUnitModal />
      </div>
      <QuestionNumericalUnitList questionNumericalUnits={questionNumericalUnits} />
    </main>
  );
}
