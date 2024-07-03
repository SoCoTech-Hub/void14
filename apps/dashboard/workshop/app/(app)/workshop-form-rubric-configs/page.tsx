import WorkshopFormRubricConfigList from "@/components/workshopFormRubricConfigs/WorkshopFormRubricConfigList";
import NewWorkshopFormRubricConfigModal from "@/components/workshopFormRubricConfigs/WorkshopFormRubricConfigModal";
import { api } from "@/lib/trpc/api";

export default async function WorkshopFormRubricConfigs() {
  const { workshopFormRubricConfigs } = await api.workshopFormRubricConfigs.getWorkshopFormRubricConfigs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshop Form Rubric Configs</h1>
        <NewWorkshopFormRubricConfigModal />
      </div>
      <WorkshopFormRubricConfigList workshopFormRubricConfigs={workshopFormRubricConfigs} />
    </main>
  );
}
