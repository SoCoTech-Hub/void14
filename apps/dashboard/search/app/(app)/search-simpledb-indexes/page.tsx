import SearchSimpledbIndexList from "@/components/searchSimpledbIndexes/SearchSimpledbIndexList";
import NewSearchSimpledbIndexModal from "@/components/searchSimpledbIndexes/SearchSimpledbIndexModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function SearchSimpledbIndexes() {
  await checkAuth();
  const { searchSimpledbIndexes } = await api.searchSimpledbIndexes.getSearchSimpledbIndexes.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Search Simpledb Indexes</h1>
        <NewSearchSimpledbIndexModal />
      </div>
      <SearchSimpledbIndexList searchSimpledbIndexes={searchSimpledbIndexes} />
    </main>
  );
}
