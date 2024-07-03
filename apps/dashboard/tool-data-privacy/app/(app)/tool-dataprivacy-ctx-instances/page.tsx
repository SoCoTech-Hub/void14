import ToolDataprivacyCtxInstanceList from "@/components/toolDataprivacyCtxInstances/ToolDataprivacyCtxInstanceList";
import NewToolDataprivacyCtxInstanceModal from "@/components/toolDataprivacyCtxInstances/ToolDataprivacyCtxInstanceModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ToolDataprivacyCtxInstances() {
  await checkAuth();
  const { toolDataprivacyCtxInstances } = await api.toolDataprivacyCtxInstances.getToolDataprivacyCtxInstances.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Dataprivacy Ctx Instances</h1>
        <NewToolDataprivacyCtxInstanceModal />
      </div>
      <ToolDataprivacyCtxInstanceList toolDataprivacyCtxInstances={toolDataprivacyCtxInstances} />
    </main>
  );
}
