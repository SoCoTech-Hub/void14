import GradingformGuideCriterionList from "@/components/gradingformGuideCriteria/GradingformGuideCriterionList";
import NewGradingformGuideCriterionModal from "@/components/gradingformGuideCriteria/GradingformGuideCriterionModal";
import { api } from "@/lib/trpc/api";

export default async function GradingformGuideCriteria() {
  const { gradingformGuideCriteria } = await api.gradingformGuideCriteria.getGradingformGuideCriteria.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Gradingform Guide Criteria</h1>
        <NewGradingformGuideCriterionModal />
      </div>
      <GradingformGuideCriterionList gradingformGuideCriteria={gradingformGuideCriteria} />
    </main>
  );
}
