import ToolDataprivacyCategoryList from "@/components/toolDataprivacyCategories/ToolDataprivacyCategoryList";
import NewToolDataprivacyCategoryModal from "@/components/toolDataprivacyCategories/ToolDataprivacyCategoryModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ToolDataprivacyCategories() {
  await checkAuth();
  const { toolDataprivacyCategories } = await api.toolDataprivacyCategories.getToolDataprivacyCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Dataprivacy Categories</h1>
        <NewToolDataprivacyCategoryModal />
      </div>
      <ToolDataprivacyCategoryList toolDataprivacyCategories={toolDataprivacyCategories} />
    </main>
  );
}
