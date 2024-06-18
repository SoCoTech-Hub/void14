"use client";
import { CompleteH5pLibrary } from "@/lib/db/schema/h5pLibraries";
import { trpc } from "@/lib/trpc/client";
import H5pLibraryModal from "./H5pLibraryModal";


export default function H5pLibraryList({ h5pLibraries }: { h5pLibraries: CompleteH5pLibrary[] }) {
  const { data: h } = trpc.h5pLibraries.getH5pLibraries.useQuery(undefined, {
    initialData: { h5pLibraries },
    refetchOnMount: false,
  });

  if (h.h5pLibraries.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {h.h5pLibraries.map((h5pLibrary) => (
        <H5pLibrary h5pLibrary={h5pLibrary} key={h5pLibrary.id} />
      ))}
    </ul>
  );
}

const H5pLibrary = ({ h5pLibrary }: { h5pLibrary: CompleteH5pLibrary }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{h5pLibrary.embedTypes}</div>
      </div>
      <H5pLibraryModal h5pLibrary={h5pLibrary} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No h5p libraries
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new h5p library.
      </p>
      <div className="mt-6">
        <H5pLibraryModal emptyState={true} />
      </div>
    </div>
  );
};

