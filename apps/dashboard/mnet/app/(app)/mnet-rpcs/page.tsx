import MnetRpcList from "@/components/mnetRpcs/MnetRpcList";
import NewMnetRpcModal from "@/components/mnetRpcs/MnetRpcModal";
import { api } from "@/lib/trpc/api";

export default async function MnetRpcs() {
  const { mnetRpcs } = await api.mnetRpcs.getMnetRpcs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mnet Rpcs</h1>
        <NewMnetRpcModal />
      </div>
      <MnetRpcList mnetRpcs={mnetRpcs} />
    </main>
  );
}
