import FilterActiveList from "@/components/filterActives/FilterActiveList";
import NewFilterActiveModal from "@/components/filterActives/FilterActiveModal";
import { api } from "@/lib/trpc/api";

export default async function FilterActives() {
  const { filterActives } = await api.filterActives.getFilterActives.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Filter Actives</h1>
        <NewFilterActiveModal />
      </div>
      <FilterActiveList filterActives={filterActives} />
    </main>
  );
}
