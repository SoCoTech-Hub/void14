import FilterConfigList from "@/components/filterConfigs/FilterConfigList";
import NewFilterConfigModal from "@/components/filterConfigs/FilterConfigModal";
import { api } from "@/lib/trpc/api";

export default async function FilterConfigs() {
  const { filterConfigs } = await api.filterConfigs.getFilterConfigs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Filter Configs</h1>
        <NewFilterConfigModal />
      </div>
      <FilterConfigList filterConfigs={filterConfigs} />
    </main>
  );
}
