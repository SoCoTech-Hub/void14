"use client";
import { CompleteH5pLibrariesCachedasset } from "@soco/h5p-db/schema/h5pLibrariesCachedassets";
import { trpc } from "@/lib/trpc/client";
import H5pLibrariesCachedassetModal from "./H5pLibrariesCachedassetModal";


export default function H5pLibrariesCachedassetList({ h5pLibrariesCachedassets }: { h5pLibrariesCachedassets: CompleteH5pLibrariesCachedasset[] }) {
  const { data: h } = trpc.h5pLibrariesCachedassets.getH5pLibrariesCachedassets.useQuery(undefined, {
    initialData: { h5pLibrariesCachedassets },
    refetchOnMount: false,
  });

  if (h.h5pLibrariesCachedassets.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {h.h5pLibrariesCachedassets.map((h5pLibrariesCachedasset) => (
        <H5pLibrariesCachedasset h5pLibrariesCachedasset={h5pLibrariesCachedasset} key={h5pLibrariesCachedasset.h5pLibrariesCachedasset.id} />
      ))}
    </ul>
  );
}

const H5pLibrariesCachedasset = ({ h5pLibrariesCachedasset }: { h5pLibrariesCachedasset: CompleteH5pLibrariesCachedasset }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{h5pLibrariesCachedasset.h5pLibrariesCachedasset.hash}</div>
      </div>
      <H5pLibrariesCachedassetModal h5pLibrariesCachedasset={h5pLibrariesCachedasset.h5pLibrariesCachedasset} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No h5p libraries cachedassets
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new h5p libraries cachedasset.
      </p>
      <div className="mt-6">
        <H5pLibrariesCachedassetModal emptyState={true} />
      </div>
    </div>
  );
};

