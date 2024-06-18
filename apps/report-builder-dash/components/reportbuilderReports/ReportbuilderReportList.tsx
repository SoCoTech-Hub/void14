"use client";
import { CompleteReportbuilderReport } from "@/lib/db/schema/reportbuilderReports";
import { trpc } from "@/lib/trpc/client";
import ReportbuilderReportModal from "./ReportbuilderReportModal";


export default function ReportbuilderReportList({ reportbuilderReports }: { reportbuilderReports: CompleteReportbuilderReport[] }) {
  const { data: r } = trpc.reportbuilderReports.getReportbuilderReports.useQuery(undefined, {
    initialData: { reportbuilderReports },
    refetchOnMount: false,
  });

  if (r.reportbuilderReports.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.reportbuilderReports.map((reportbuilderReport) => (
        <ReportbuilderReport reportbuilderReport={reportbuilderReport} key={reportbuilderReport.id} />
      ))}
    </ul>
  );
}

const ReportbuilderReport = ({ reportbuilderReport }: { reportbuilderReport: CompleteReportbuilderReport }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{reportbuilderReport.area}</div>
      </div>
      <ReportbuilderReportModal reportbuilderReport={reportbuilderReport} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No reportbuilder reports
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new reportbuilder report.
      </p>
      <div className="mt-6">
        <ReportbuilderReportModal emptyState={true} />
      </div>
    </div>
  );
};

