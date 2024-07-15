"use client";
import { CompleteFilterConfig } from "@soco/filter-db/schema/filterConfigs";
import { trpc } from "@/lib/trpc/client";
import FilterConfigModal from "./FilterConfigModal";


export default function FilterConfigList({ filterConfigs }: { filterConfigs: CompleteFilterConfig[] }) {
  const { data: f } = trpc.filterConfigs.getFilterConfigs.useQuery(undefined, {
    initialData: { filterConfigs },
    refetchOnMount: false,
  });

  if (f.filterConfigs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.filterConfigs.map((filterConfig) => (
        <FilterConfig filterConfig={filterConfig} key={filterConfig.id} />
      ))}
    </ul>
  );
}

const FilterConfig = ({ filterConfig }: { filterConfig: CompleteFilterConfig }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{filterConfig.contextId}</div>
      </div>
      <FilterConfigModal filterConfig={filterConfig} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No filter configs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new filter config.
      </p>
      <div className="mt-6">
        <FilterConfigModal emptyState={true} />
      </div>
    </div>
  );
};

