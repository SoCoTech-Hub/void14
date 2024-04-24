import BlockList from "@/components/blocks/BlockList";
import NewBlockModal from "@/components/blocks/BlockModal";
import { api } from "@/lib/trpc/api";

export default async function Blocks() {
  const { blocks } = await api.blocks.getBlocks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Blocks</h1>
        <NewBlockModal />
      </div>
      <BlockList blocks={blocks} />
    </main>
  );
}
