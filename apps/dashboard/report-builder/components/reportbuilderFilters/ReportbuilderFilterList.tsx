"use client";
import { CompleteReportbuilderFilter } from "@soco/report-builder-db/schema/reportbuilderFilters";
import { trpc } from "@/lib/trpc/client";
import ReportbuilderFilterModal from "./ReportbuilderFilterModal";


export default function ReportbuilderFilterList({ reportbuilderFilters }: { reportbuilderFilters: CompleteReportbuilderFilter[] }) {
  const { data: r } = trpc.reportbuilderFilters.getReportbuilderFilters.useQuery(undefined, {
    initialData: { reportbuilderFilters },
    refetchOnMount: false,
  });

  if (r.reportbuilderFilters.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.reportbuilderFilters.map((reportbuilderFilter) => (
        <ReportbuilderFilter reportbuilderFilter={reportbuilderFilter} key={reportbuilderFilter.id} />
      ))}
    </ul>
  );
}

const ReportbuilderFilter = ({ reportbuilderFilter }: { reportbuilderFilter: CompleteReportbuilderFilter }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{reportbuilderFilter.filterOrder}</div>
      </div>
      <ReportbuilderFilterModal reportbuilderFilter={reportbuilderFilter} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No reportbuilder filters
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new reportbuilder filter.
      </p>
      <div className="mt-6">
        <ReportbuilderFilterModal emptyState={true} />
      </div>
    </div>
  );
};

