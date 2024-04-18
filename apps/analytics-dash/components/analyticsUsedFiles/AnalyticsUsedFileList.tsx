"use client";
import { CompleteAnalyticsUsedFile } from "@/lib/db/schema/analyticsUsedFiles";
import { trpc } from "@/lib/trpc/client";
import AnalyticsUsedFileModal from "./AnalyticsUsedFileModal";


export default function AnalyticsUsedFileList({ analyticsUsedFiles }: { analyticsUsedFiles: CompleteAnalyticsUsedFile[] }) {
  const { data: a } = trpc.analyticsUsedFiles.getAnalyticsUsedFiles.useQuery(undefined, {
    initialData: { analyticsUsedFiles },
    refetchOnMount: false,
  });

  if (a.analyticsUsedFiles.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.analyticsUsedFiles.map((analyticsUsedFile) => (
        <AnalyticsUsedFile analyticsUsedFile={analyticsUsedFile} key={analyticsUsedFile.id} />
      ))}
    </ul>
  );
}

const AnalyticsUsedFile = ({ analyticsUsedFile }: { analyticsUsedFile: CompleteAnalyticsUsedFile }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{analyticsUsedFile.action}</div>
      </div>
      <AnalyticsUsedFileModal analyticsUsedFile={analyticsUsedFile} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No analytics used files
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new analytics used file.
      </p>
      <div className="mt-6">
        <AnalyticsUsedFileModal emptyState={true} />
      </div>
    </div>
  );
};

