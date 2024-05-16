import WorkshopList from "@/components/workshops/WorkshopList";
import NewWorkshopModal from "@/components/workshops/WorkshopModal";
import { api } from "@/lib/trpc/api";

export default async function Workshops() {
  const { workshops } = await api.workshops.getWorkshops.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshops</h1>
        <NewWorkshopModal />
      </div>
      <WorkshopList workshops={workshops} />
    </main>
  );
}
