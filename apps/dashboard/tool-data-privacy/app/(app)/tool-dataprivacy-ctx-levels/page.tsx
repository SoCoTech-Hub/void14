import ToolDataprivacyCtxLevelList from "@/components/toolDataprivacyCtxLevels/ToolDataprivacyCtxLevelList";
import NewToolDataprivacyCtxLevelModal from "@/components/toolDataprivacyCtxLevels/ToolDataprivacyCtxLevelModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ToolDataprivacyCtxLevels() {
  await checkAuth();
  const { toolDataprivacyCtxLevels } = await api.toolDataprivacyCtxLevels.getToolDataprivacyCtxLevels.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Dataprivacy Ctx Levels</h1>
        <NewToolDataprivacyCtxLevelModal />
      </div>
      <ToolDataprivacyCtxLevelList toolDataprivacyCtxLevels={toolDataprivacyCtxLevels} />
    </main>
  );
}
