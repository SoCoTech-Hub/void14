import GradingformRubricLevelList from "@/components/gradingformRubricLevels/GradingformRubricLevelList";
import NewGradingformRubricLevelModal from "@/components/gradingformRubricLevels/GradingformRubricLevelModal";
import { api } from "@/lib/trpc/api";

export default async function GradingformRubricLevels() {
  const { gradingformRubricLevels } = await api.gradingformRubricLevels.getGradingformRubricLevels.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Gradingform Rubric Levels</h1>
        <NewGradingformRubricLevelModal />
      </div>
      <GradingformRubricLevelList gradingformRubricLevels={gradingformRubricLevels} />
    </main>
  );
}
