import BlockPositionList from "@/components/blockPositions/BlockPositionList";
import NewBlockPositionModal from "@/components/blockPositions/BlockPositionModal";
import { api } from "@/lib/trpc/api";

export default async function BlockPositions() {
  const { blockPositions } = await api.blockPositions.getBlockPositions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Block Positions</h1>
        <NewBlockPositionModal />
      </div>
      <BlockPositionList blockPositions={blockPositions} />
    </main>
  );
}
