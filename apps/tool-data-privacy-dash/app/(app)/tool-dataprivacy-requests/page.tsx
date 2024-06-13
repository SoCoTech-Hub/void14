import ToolDataprivacyRequestList from "@/components/toolDataprivacyRequests/ToolDataprivacyRequestList";
import NewToolDataprivacyRequestModal from "@/components/toolDataprivacyRequests/ToolDataprivacyRequestModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ToolDataprivacyRequests() {
  await checkAuth();
  const { toolDataprivacyRequests } = await api.toolDataprivacyRequests.getToolDataprivacyRequests.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Dataprivacy Requests</h1>
        <NewToolDataprivacyRequestModal />
      </div>
      <ToolDataprivacyRequestList toolDataprivacyRequests={toolDataprivacyRequests} />
    </main>
  );
}
