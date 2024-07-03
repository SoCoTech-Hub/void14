import ToolDataprivacyCtxExpiredList from "@/components/toolDataprivacyCtxExpireds/ToolDataprivacyCtxExpiredList";
import NewToolDataprivacyCtxExpiredModal from "@/components/toolDataprivacyCtxExpireds/ToolDataprivacyCtxExpiredModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ToolDataprivacyCtxExpireds() {
  await checkAuth();
  const { toolDataprivacyCtxExpireds } = await api.toolDataprivacyCtxExpireds.getToolDataprivacyCtxExpireds.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Dataprivacy Ctx Expireds</h1>
        <NewToolDataprivacyCtxExpiredModal />
      </div>
      <ToolDataprivacyCtxExpiredList toolDataprivacyCtxExpireds={toolDataprivacyCtxExpireds} />
    </main>
  );
}
