import MnetRemoteRpcList from "@/components/mnetRemoteRpc/MnetRemoteRpcList";
import NewMnetRemoteRpcModal from "@/components/mnetRemoteRpc/MnetRemoteRpcModal";
import { api } from "@/lib/trpc/api";

export default async function MnetRemoteRpc() {
  const { mnetRemoteRpc } = await api.mnetRemoteRpc.getMnetRemoteRpc.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mnet Remote Rpc</h1>
        <NewMnetRemoteRpcModal />
      </div>
      <MnetRemoteRpcList mnetRemoteRpc={mnetRemoteRpc} />
    </main>
  );
}
