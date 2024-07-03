import ShowsCategoryList from "@/components/showsCategories/ShowsCategoryList";
import NewShowsCategoryModal from "@/components/showsCategories/ShowsCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function ShowsCategories() {
  const { showsCategories } = await api.showsCategories.getShowsCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Shows Categories</h1>
        <NewShowsCategoryModal />
      </div>
      <ShowsCategoryList showsCategories={showsCategories} />
    </main>
  );
}
