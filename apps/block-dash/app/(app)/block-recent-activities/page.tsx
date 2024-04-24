import BlockRecentActivityList from "@/components/blockRecentActivities/BlockRecentActivityList";
import NewBlockRecentActivityModal from "@/components/blockRecentActivities/BlockRecentActivityModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function BlockRecentActivities() {
  await checkAuth();
  const { blockRecentActivities } = await api.blockRecentActivities.getBlockRecentActivities.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Block Recent Activities</h1>
        <NewBlockRecentActivityModal />
      </div>
      <BlockRecentActivityList blockRecentActivities={blockRecentActivities} />
    </main>
  );
}
