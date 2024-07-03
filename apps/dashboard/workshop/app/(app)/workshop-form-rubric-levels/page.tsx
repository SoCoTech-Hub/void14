import WorkshopFormRubricLevelList from "@/components/workshopFormRubricLevels/WorkshopFormRubricLevelList";
import NewWorkshopFormRubricLevelModal from "@/components/workshopFormRubricLevels/WorkshopFormRubricLevelModal";
import { api } from "@/lib/trpc/api";

export default async function WorkshopFormRubricLevels() {
  const { workshopFormRubricLevels } = await api.workshopFormRubricLevels.getWorkshopFormRubricLevels.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshop Form Rubric Levels</h1>
        <NewWorkshopFormRubricLevelModal />
      </div>
      <WorkshopFormRubricLevelList workshopFormRubricLevels={workshopFormRubricLevels} />
    </main>
  );
}
