"use client";
import { CompleteSearchIndexRequest } from "@soco/search-db/schema/searchIndexRequests";
import { trpc } from "@/lib/trpc/client";
import SearchIndexRequestModal from "./SearchIndexRequestModal";


export default function SearchIndexRequestList({ searchIndexRequests }: { searchIndexRequests: CompleteSearchIndexRequest[] }) {
  const { data: s } = trpc.searchIndexRequests.getSearchIndexRequests.useQuery(undefined, {
    initialData: { searchIndexRequests },
    refetchOnMount: false,
  });

  if (s.searchIndexRequests.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.searchIndexRequests.map((searchIndexRequest) => (
        <SearchIndexRequest searchIndexRequest={searchIndexRequest} key={searchIndexRequest.id} />
      ))}
    </ul>
  );
}

const SearchIndexRequest = ({ searchIndexRequest }: { searchIndexRequest: CompleteSearchIndexRequest }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{searchIndexRequest.contextId}</div>
      </div>
      <SearchIndexRequestModal searchIndexRequest={searchIndexRequest} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No search index requests
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new search index request.
      </p>
      <div className="mt-6">
        <SearchIndexRequestModal emptyState={true} />
      </div>
    </div>
  );
};

