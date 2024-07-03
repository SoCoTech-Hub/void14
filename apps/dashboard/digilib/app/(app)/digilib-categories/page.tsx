import DigilibCategoryList from "@/components/digilibCategories/DigilibCategoryList";
import NewDigilibCategoryModal from "@/components/digilibCategories/DigilibCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function DigilibCategories() {
  const { digilibCategories } = await api.digilibCategories.getDigilibCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Digilib Categories</h1>
        <NewDigilibCategoryModal />
      </div>
      <DigilibCategoryList digilibCategories={digilibCategories} />
    </main>
  );
}
