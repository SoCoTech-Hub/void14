"use client";
import { CompleteH5pLibraryDependency } from "@/lib/db/schema/h5pLibraryDependencies";
import { trpc } from "@/lib/trpc/client";
import H5pLibraryDependencyModal from "./H5pLibraryDependencyModal";


export default function H5pLibraryDependencyList({ h5pLibraryDependencies }: { h5pLibraryDependencies: CompleteH5pLibraryDependency[] }) {
  const { data: h } = trpc.h5pLibraryDependencies.getH5pLibraryDependencies.useQuery(undefined, {
    initialData: { h5pLibraryDependencies },
    refetchOnMount: false,
  });

  if (h.h5pLibraryDependencies.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {h.h5pLibraryDependencies.map((h5pLibraryDependency) => (
        <H5pLibraryDependency h5pLibraryDependency={h5pLibraryDependency} key={h5pLibraryDependency.h5pLibraryDependency.id} />
      ))}
    </ul>
  );
}

const H5pLibraryDependency = ({ h5pLibraryDependency }: { h5pLibraryDependency: CompleteH5pLibraryDependency }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{h5pLibraryDependency.h5pLibraryDependency.dependencyType}</div>
      </div>
      <H5pLibraryDependencyModal h5pLibraryDependency={h5pLibraryDependency.h5pLibraryDependency} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No h5p library dependencies
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new h5p library dependency.
      </p>
      <div className="mt-6">
        <H5pLibraryDependencyModal emptyState={true} />
      </div>
    </div>
  );
};

