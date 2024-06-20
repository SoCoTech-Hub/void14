import MnetServiceList from "@/components/mnetServices/MnetServiceList";
import NewMnetServiceModal from "@/components/mnetServices/MnetServiceModal";
import { api } from "@/lib/trpc/api";

export default async function MnetServices() {
  const { mnetServices } = await api.mnetServices.getMnetServices.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mnet Services</h1>
        <NewMnetServiceModal />
      </div>
      <MnetServiceList mnetServices={mnetServices} />
    </main>
  );
}
