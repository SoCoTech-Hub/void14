import WorkshopFormNumErrorMapList from "@/components/workshopFormNumErrorMaps/WorkshopFormNumErrorMapList";
import NewWorkshopFormNumErrorMapModal from "@/components/workshopFormNumErrorMaps/WorkshopFormNumErrorMapModal";
import { api } from "@/lib/trpc/api";

export default async function WorkshopFormNumErrorMaps() {
  const { workshopFormNumErrorMaps } = await api.workshopFormNumErrorMaps.getWorkshopFormNumErrorMaps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshop Form Num Error Maps</h1>
        <NewWorkshopFormNumErrorMapModal />
      </div>
      <WorkshopFormNumErrorMapList workshopFormNumErrorMaps={workshopFormNumErrorMaps} />
    </main>
  );
}
