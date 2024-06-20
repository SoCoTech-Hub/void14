import MnetApplicationList from "@/components/mnetApplications/MnetApplicationList";
import NewMnetApplicationModal from "@/components/mnetApplications/MnetApplicationModal";
import { api } from "@/lib/trpc/api";

export default async function MnetApplications() {
  const { mnetApplications } = await api.mnetApplications.getMnetApplications.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mnet Applications</h1>
        <NewMnetApplicationModal />
      </div>
      <MnetApplicationList mnetApplications={mnetApplications} />
    </main>
  );
}
