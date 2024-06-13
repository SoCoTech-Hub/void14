import ToolDataprivacyPurposeList from "@/components/toolDataprivacyPurposes/ToolDataprivacyPurposeList";
import NewToolDataprivacyPurposeModal from "@/components/toolDataprivacyPurposes/ToolDataprivacyPurposeModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ToolDataprivacyPurposes() {
  await checkAuth();
  const { toolDataprivacyPurposes } = await api.toolDataprivacyPurposes.getToolDataprivacyPurposes.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Dataprivacy Purposes</h1>
        <NewToolDataprivacyPurposeModal />
      </div>
      <ToolDataprivacyPurposeList toolDataprivacyPurposes={toolDataprivacyPurposes} />
    </main>
  );
}
