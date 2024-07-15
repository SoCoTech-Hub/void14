import WorkshopFormRubricList from "@/components/workshopFormRubrics/WorkshopFormRubricList";
import NewWorkshopFormRubricModal from "@/components/workshopFormRubrics/WorkshopFormRubricModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function WorkshopFormRubrics() {
  await checkAuth();
  const { workshopFormRubrics } = await api.workshopFormRubrics.getWorkshopFormRubrics.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshop Form Rubrics</h1>
        <NewWorkshopFormRubricModal />
      </div>
      <WorkshopFormRubricList workshopFormRubrics={workshopFormRubrics} />
    </main>
  );
}
