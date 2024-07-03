"use client";
import { CompleteFilesReference } from "@/lib/db/schema/filesReferences";
import { trpc } from "@/lib/trpc/client";
import FilesReferenceModal from "./FilesReferenceModal";


export default function FilesReferenceList({ filesReferences }: { filesReferences: CompleteFilesReference[] }) {
  const { data: f } = trpc.filesReferences.getFilesReferences.useQuery(undefined, {
    initialData: { filesReferences },
    refetchOnMount: false,
  });

  if (f.filesReferences.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.filesReferences.map((filesReference) => (
        <FilesReference filesReference={filesReference} key={filesReference.id} />
      ))}
    </ul>
  );
}

const FilesReference = ({ filesReference }: { filesReference: CompleteFilesReference }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{filesReference.lastSync.toString()}</div>
      </div>
      <FilesReferenceModal filesReference={filesReference} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No files references
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new files reference.
      </p>
      <div className="mt-6">
        <FilesReferenceModal emptyState={true} />
      </div>
    </div>
  );
};

