import BursaryCategoryList from "@/components/bursaryCategories/BursaryCategoryList";
import NewBursaryCategoryModal from "@/components/bursaryCategories/BursaryCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function BursaryCategories() {
  const { bursaryCategories } = await api.bursaryCategories.getBursaryCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Bursary Categories</h1>
        <NewBursaryCategoryModal />
      </div>
      <BursaryCategoryList bursaryCategories={bursaryCategories} />
    </main>
  );
}
