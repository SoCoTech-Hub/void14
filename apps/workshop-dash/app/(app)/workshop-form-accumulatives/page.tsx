import WorkshopFormAccumulativeList from "@/components/workshopFormAccumulatives/WorkshopFormAccumulativeList";
import NewWorkshopFormAccumulativeModal from "@/components/workshopFormAccumulatives/WorkshopFormAccumulativeModal";
import { api } from "@/lib/trpc/api";

export default async function WorkshopFormAccumulatives() {
  const { workshopFormAccumulatives } = await api.workshopFormAccumulatives.getWorkshopFormAccumulatives.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshop Form Accumulatives</h1>
        <NewWorkshopFormAccumulativeModal />
      </div>
      <WorkshopFormAccumulativeList workshopFormAccumulatives={workshopFormAccumulatives} />
    </main>
  );
}
