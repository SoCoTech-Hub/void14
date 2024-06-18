"use client";
import { CompleteH5pContentsLibrary } from "@/lib/db/schema/h5pContentsLibraries";
import { trpc } from "@/lib/trpc/client";
import H5pContentsLibraryModal from "./H5pContentsLibraryModal";


export default function H5pContentsLibraryList({ h5pContentsLibraries }: { h5pContentsLibraries: CompleteH5pContentsLibrary[] }) {
  const { data: h } = trpc.h5pContentsLibraries.getH5pContentsLibraries.useQuery(undefined, {
    initialData: { h5pContentsLibraries },
    refetchOnMount: false,
  });

  if (h.h5pContentsLibraries.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {h.h5pContentsLibraries.map((h5pContentsLibrary) => (
        <H5pContentsLibrary h5pContentsLibrary={h5pContentsLibrary} key={h5pContentsLibrary.id} />
      ))}
    </ul>
  );
}

const H5pContentsLibrary = ({ h5pContentsLibrary }: { h5pContentsLibrary: CompleteH5pContentsLibrary }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{h5pContentsLibrary.dependencyType}</div>
      </div>
      <H5pContentsLibraryModal h5pContentsLibrary={h5pContentsLibrary} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No h5p contents libraries
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new h5p contents library.
      </p>
      <div className="mt-6">
        <H5pContentsLibraryModal emptyState={true} />
      </div>
    </div>
  );
};

