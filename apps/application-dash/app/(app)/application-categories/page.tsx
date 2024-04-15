import ApplicationCategoryList from "@/components/applicationCategories/ApplicationCategoryList";
import NewApplicationCategoryModal from "@/components/applicationCategories/ApplicationCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function ApplicationCategories() {
  const { applicationCategories } = await api.applicationCategories.getApplicationCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Application Categories</h1>
        <NewApplicationCategoryModal />
      </div>
      <ApplicationCategoryList applicationCategories={applicationCategories} />
    </main>
  );
}
