"use client";
import { CompleteFile } from "@soco/file-db/schema/files";
import { trpc } from "@/lib/trpc/client";
import FileModal from "./FileModal";


export default function FileList({ files }: { files: CompleteFile[] }) {
  const { data: f } = trpc.files.getFiles.useQuery(undefined, {
    initialData: { files },
    refetchOnMount: false,
  });

  if (f.files.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.files.map((file) => (
        <File file={file} key={file.id} />
      ))}
    </ul>
  );
}

const File = ({ file }: { file: CompleteFile }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{file.author}</div>
      </div>
      <FileModal file={file} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No files
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new file.
      </p>
      <div className="mt-6">
        <FileModal emptyState={true} />
      </div>
    </div>
  );
};

