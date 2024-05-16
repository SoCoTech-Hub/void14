import WorkshopFormNumErrorList from "@/components/workshopFormNumErrors/WorkshopFormNumErrorList";
import NewWorkshopFormNumErrorModal from "@/components/workshopFormNumErrors/WorkshopFormNumErrorModal";
import { api } from "@/lib/trpc/api";

export default async function WorkshopFormNumErrors() {
  const { workshopFormNumErrors } = await api.workshopFormNumErrors.getWorkshopFormNumErrors.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshop Form Num Errors</h1>
        <NewWorkshopFormNumErrorModal />
      </div>
      <WorkshopFormNumErrorList workshopFormNumErrors={workshopFormNumErrors} />
    </main>
  );
}
