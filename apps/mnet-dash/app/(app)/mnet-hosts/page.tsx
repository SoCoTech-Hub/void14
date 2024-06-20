import MnetHostList from "@/components/mnetHosts/MnetHostList";
import NewMnetHostModal from "@/components/mnetHosts/MnetHostModal";
import { api } from "@/lib/trpc/api";

export default async function MnetHosts() {
  const { mnetHosts } = await api.mnetHosts.getMnetHosts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mnet Hosts</h1>
        <NewMnetHostModal />
      </div>
      <MnetHostList mnetHosts={mnetHosts} />
    </main>
  );
}
