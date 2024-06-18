"use client";
import { CompleteReportbuilderColumn } from "@/lib/db/schema/reportbuilderColumns";
import { trpc } from "@/lib/trpc/client";
import ReportbuilderColumnModal from "./ReportbuilderColumnModal";


export default function ReportbuilderColumnList({ reportbuilderColumns }: { reportbuilderColumns: CompleteReportbuilderColumn[] }) {
  const { data: r } = trpc.reportbuilderColumns.getReportbuilderColumns.useQuery(undefined, {
    initialData: { reportbuilderColumns },
    refetchOnMount: false,
  });

  if (r.reportbuilderColumns.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.reportbuilderColumns.map((reportbuilderColumn) => (
        <ReportbuilderColumn reportbuilderColumn={reportbuilderColumn} key={reportbuilderColumn.id} />
      ))}
    </ul>
  );
}

const ReportbuilderColumn = ({ reportbuilderColumn }: { reportbuilderColumn: CompleteReportbuilderColumn }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{reportbuilderColumn.aggregation}</div>
      </div>
      <ReportbuilderColumnModal reportbuilderColumn={reportbuilderColumn} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No reportbuilder columns
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new reportbuilder column.
      </p>
      <div className="mt-6">
        <ReportbuilderColumnModal emptyState={true} />
      </div>
    </div>
  );
};

