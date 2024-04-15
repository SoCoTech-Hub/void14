import BursaryCategoriesBursaryList from "@/components/bursaryCategoriesBursaries/BursaryCategoriesBursaryList";
import NewBursaryCategoriesBursaryModal from "@/components/bursaryCategoriesBursaries/BursaryCategoriesBursaryModal";
import { api } from "@/lib/trpc/api";

export default async function BursaryCategoriesBursaries() {
  const { bursaryCategoriesBursaries } = await api.bursaryCategoriesBursaries.getBursaryCategoriesBursaries.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Bursary Categories Bursaries</h1>
        <NewBursaryCategoriesBursaryModal />
      </div>
      <BursaryCategoriesBursaryList bursaryCategoriesBursaries={bursaryCategoriesBursaries} />
    </main>
  );
}
