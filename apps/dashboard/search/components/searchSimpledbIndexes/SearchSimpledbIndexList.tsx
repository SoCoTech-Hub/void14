"use client";
import { CompleteSearchSimpledbIndex } from "@soco/search-db/schema/searchSimpledbIndexes";
import { trpc } from "@/lib/trpc/client";
import SearchSimpledbIndexModal from "./SearchSimpledbIndexModal";


export default function SearchSimpledbIndexList({ searchSimpledbIndexes }: { searchSimpledbIndexes: CompleteSearchSimpledbIndex[] }) {
  const { data: s } = trpc.searchSimpledbIndexes.getSearchSimpledbIndexes.useQuery(undefined, {
    initialData: { searchSimpledbIndexes },
    refetchOnMount: false,
  });

  if (s.searchSimpledbIndexes.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.searchSimpledbIndexes.map((searchSimpledbIndex) => (
        <SearchSimpledbIndex searchSimpledbIndex={searchSimpledbIndex} key={searchSimpledbIndex.id} />
      ))}
    </ul>
  );
}

const SearchSimpledbIndex = ({ searchSimpledbIndex }: { searchSimpledbIndex: CompleteSearchSimpledbIndex }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{searchSimpledbIndex.areaId}</div>
      </div>
      <SearchSimpledbIndexModal searchSimpledbIndex={searchSimpledbIndex} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No search simpledb indexes
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new search simpledb index.
      </p>
      <div className="mt-6">
        <SearchSimpledbIndexModal emptyState={true} />
      </div>
    </div>
  );
};

