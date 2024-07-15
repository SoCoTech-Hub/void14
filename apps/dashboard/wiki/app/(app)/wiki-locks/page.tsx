import WikiLockList from "@/components/wikiLocks/WikiLockList";
import NewWikiLockModal from "@/components/wikiLocks/WikiLockModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function WikiLocks() {
  await checkAuth();
  const { wikiLocks } = await api.wikiLocks.getWikiLocks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Wiki Locks</h1>
        <NewWikiLockModal />
      </div>
      <WikiLockList wikiLocks={wikiLocks} />
    </main>
  );
}
