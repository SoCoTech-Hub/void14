import ToolRecyclebinCategoryList from "@/components/toolRecyclebinCategories/ToolRecyclebinCategoryList";
import NewToolRecyclebinCategoryModal from "@/components/toolRecyclebinCategories/ToolRecyclebinCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function ToolRecyclebinCategories() {
  const { toolRecyclebinCategories } = await api.toolRecyclebinCategories.getToolRecyclebinCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Recyclebin Categories</h1>
        <NewToolRecyclebinCategoryModal />
      </div>
      <ToolRecyclebinCategoryList toolRecyclebinCategories={toolRecyclebinCategories} />
    </main>
  );
}
