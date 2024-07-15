"use client";
import { CompleteFolder } from "@soco/file-db/schema/folders";
import { trpc } from "@/lib/trpc/client";
import FolderModal from "./FolderModal";


export default function FolderList({ folders }: { folders: CompleteFolder[] }) {
  const { data: f } = trpc.folders.getFolders.useQuery(undefined, {
    initialData: { folders },
    refetchOnMount: false,
  });

  if (f.folders.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.folders.map((folder) => (
        <Folder folder={folder} key={folder.id} />
      ))}
    </ul>
  );
}

const Folder = ({ folder }: { folder: CompleteFolder }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{folder.course}</div>
      </div>
      <FolderModal folder={folder} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No folders
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new folder.
      </p>
      <div className="mt-6">
        <FolderModal emptyState={true} />
      </div>
    </div>
  );
};

