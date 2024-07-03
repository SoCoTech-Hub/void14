import BlockRssClientList from "@/components/blockRssClients/BlockRssClientList";
import NewBlockRssClientModal from "@/components/blockRssClients/BlockRssClientModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function BlockRssClients() {
  await checkAuth();
  const { blockRssClients } = await api.blockRssClients.getBlockRssClients.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Block Rss Clients</h1>
        <NewBlockRssClientModal />
      </div>
      <BlockRssClientList blockRssClients={blockRssClients} />
    </main>
  );
}
