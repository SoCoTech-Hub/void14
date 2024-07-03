import BlockRecentlyAccessedItemList from "@/components/blockRecentlyAccessedItems/BlockRecentlyAccessedItemList";
import NewBlockRecentlyAccessedItemModal from "@/components/blockRecentlyAccessedItems/BlockRecentlyAccessedItemModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function BlockRecentlyAccessedItems() {
  await checkAuth();
  const { blockRecentlyAccessedItems } = await api.blockRecentlyAccessedItems.getBlockRecentlyAccessedItems.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Block Recently Accessed Items</h1>
        <NewBlockRecentlyAccessedItemModal />
      </div>
      <BlockRecentlyAccessedItemList blockRecentlyAccessedItems={blockRecentlyAccessedItems} />
    </main>
  );
}
