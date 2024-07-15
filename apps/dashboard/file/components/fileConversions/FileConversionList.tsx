"use client";
import { CompleteFileConversion } from "@soco/file-db/schema/fileConversions";
import { trpc } from "@/lib/trpc/client";
import FileConversionModal from "./FileConversionModal";


export default function FileConversionList({ fileConversions }: { fileConversions: CompleteFileConversion[] }) {
  const { data: f } = trpc.fileConversions.getFileConversions.useQuery(undefined, {
    initialData: { fileConversions },
    refetchOnMount: false,
  });

  if (f.fileConversions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.fileConversions.map((fileConversion) => (
        <FileConversion fileConversion={fileConversion} key={fileConversion.id} />
      ))}
    </ul>
  );
}

const FileConversion = ({ fileConversion }: { fileConversion: CompleteFileConversion }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{fileConversion.converter}</div>
      </div>
      <FileConversionModal fileConversion={fileConversion} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No file conversions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new file conversion.
      </p>
      <div className="mt-6">
        <FileConversionModal emptyState={true} />
      </div>
    </div>
  );
};

