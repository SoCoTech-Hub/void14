import CustomFieldCategoryList from "@/components/customFieldCategories/CustomFieldCategoryList";
import NewCustomFieldCategoryModal from "@/components/customFieldCategories/CustomFieldCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function CustomFieldCategories() {
  const { customFieldCategories } = await api.customFieldCategories.getCustomFieldCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Custom Field Categories</h1>
        <NewCustomFieldCategoryModal />
      </div>
      <CustomFieldCategoryList customFieldCategories={customFieldCategories} />
    </main>
  );
}
