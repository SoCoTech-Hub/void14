import MnetRemoteService2rpcList from "@/components/mnetRemoteService2rpcs/MnetRemoteService2rpcList";
import NewMnetRemoteService2rpcModal from "@/components/mnetRemoteService2rpcs/MnetRemoteService2rpcModal";
import { api } from "@/lib/trpc/api";

export default async function MnetRemoteService2rpcs() {
  const { mnetRemoteService2rpcs } = await api.mnetRemoteService2rpcs.getMnetRemoteService2rpcs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mnet Remote Service2rpcs</h1>
        <NewMnetRemoteService2rpcModal />
      </div>
      <MnetRemoteService2rpcList mnetRemoteService2rpcs={mnetRemoteService2rpcs} />
    </main>
  );
}
