import GradingformRubricCriteriaList from "@/components/gradingformRubricCriterias/GradingformRubricCriteriaList";
import NewGradingformRubricCriteriaModal from "@/components/gradingformRubricCriterias/GradingformRubricCriteriaModal";
import { api } from "@/lib/trpc/api";

export default async function GradingformRubricCriterias() {
  const { gradingformRubricCriterias } = await api.gradingformRubricCriterias.getGradingformRubricCriterias.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Gradingform Rubric Criterias</h1>
        <NewGradingformRubricCriteriaModal />
      </div>
      <GradingformRubricCriteriaList gradingformRubricCriterias={gradingformRubricCriterias} />
    </main>
  );
}
