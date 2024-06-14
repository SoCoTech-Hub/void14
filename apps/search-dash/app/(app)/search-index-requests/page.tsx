import SearchIndexRequestList from "@/components/searchIndexRequests/SearchIndexRequestList";
import NewSearchIndexRequestModal from "@/components/searchIndexRequests/SearchIndexRequestModal";
import { api } from "@/lib/trpc/api";

export default async function SearchIndexRequests() {
  const { searchIndexRequests } = await api.searchIndexRequests.getSearchIndexRequests.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Search Index Requests</h1>
        <NewSearchIndexRequestModal />
      </div>
      <SearchIndexRequestList searchIndexRequests={searchIndexRequests} />
    </main>
  );
}
