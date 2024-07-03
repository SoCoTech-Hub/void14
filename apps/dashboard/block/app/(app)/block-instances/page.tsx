import BlockInstanceList from "@/components/blockInstances/BlockInstanceList";
import NewBlockInstanceModal from "@/components/blockInstances/BlockInstanceModal";
import { api } from "@/lib/trpc/api";

export default async function BlockInstances() {
  const { blockInstances } = await api.blockInstances.getBlockInstances.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Block Instances</h1>
        <NewBlockInstanceModal />
      </div>
      <BlockInstanceList blockInstances={blockInstances} />
    </main>
  );
}
