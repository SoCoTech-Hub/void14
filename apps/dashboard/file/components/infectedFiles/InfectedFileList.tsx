"use client";
import { CompleteInfectedFile } from "@soco/file-db/schema/infectedFiles";
import { trpc } from "@/lib/trpc/client";
import InfectedFileModal from "./InfectedFileModal";


export default function InfectedFileList({ infectedFiles }: { infectedFiles: CompleteInfectedFile[] }) {
  const { data: i } = trpc.infectedFiles.getInfectedFiles.useQuery(undefined, {
    initialData: { infectedFiles },
    refetchOnMount: false,
  });

  if (i.infectedFiles.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {i.infectedFiles.map((infectedFile) => (
        <InfectedFile infectedFile={infectedFile} key={infectedFile.id} />
      ))}
    </ul>
  );
}

const InfectedFile = ({ infectedFile }: { infectedFile: CompleteInfectedFile }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{infectedFile.fileName}</div>
      </div>
      <InfectedFileModal infectedFile={infectedFile} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No infected files
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new infected file.
      </p>
      <div className="mt-6">
        <InfectedFileModal emptyState={true} />
      </div>
    </div>
  );
};

