import MnetService2rpcList from "@/components/mnetService2rpcs/MnetService2rpcList";
import NewMnetService2rpcModal from "@/components/mnetService2rpcs/MnetService2rpcModal";
import { api } from "@/lib/trpc/api";

export default async function MnetService2rpcs() {
  const { mnetService2rpcs } = await api.mnetService2rpcs.getMnetService2rpcs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mnet Service2rpcs</h1>
        <NewMnetService2rpcModal />
      </div>
      <MnetService2rpcList mnetService2rpcs={mnetService2rpcs} />
    </main>
  );
}
