"use client";
import { CompleteFilterActive } from "@/lib/db/schema/filterActives";
import { trpc } from "@/lib/trpc/client";
import FilterActiveModal from "./FilterActiveModal";


export default function FilterActiveList({ filterActives }: { filterActives: CompleteFilterActive[] }) {
  const { data: f } = trpc.filterActives.getFilterActives.useQuery(undefined, {
    initialData: { filterActives },
    refetchOnMount: false,
  });

  if (f.filterActives.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.filterActives.map((filterActive) => (
        <FilterActive filterActive={filterActive} key={filterActive.id} />
      ))}
    </ul>
  );
}

const FilterActive = ({ filterActive }: { filterActive: CompleteFilterActive }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{filterActive.active}</div>
      </div>
      <FilterActiveModal filterActive={filterActive} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No filter actives
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new filter active.
      </p>
      <div className="mt-6">
        <FilterActiveModal emptyState={true} />
      </div>
    </div>
  );
};

