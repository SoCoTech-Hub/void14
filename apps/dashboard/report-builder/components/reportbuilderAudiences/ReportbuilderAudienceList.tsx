"use client";
import { CompleteReportbuilderAudience } from "@/lib/db/schema/reportbuilderAudiences";
import { trpc } from "@/lib/trpc/client";
import ReportbuilderAudienceModal from "./ReportbuilderAudienceModal";


export default function ReportbuilderAudienceList({ reportbuilderAudiences }: { reportbuilderAudiences: CompleteReportbuilderAudience[] }) {
  const { data: r } = trpc.reportbuilderAudiences.getReportbuilderAudiences.useQuery(undefined, {
    initialData: { reportbuilderAudiences },
    refetchOnMount: false,
  });

  if (r.reportbuilderAudiences.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.reportbuilderAudiences.map((reportbuilderAudience) => (
        <ReportbuilderAudience reportbuilderAudience={reportbuilderAudience} key={reportbuilderAudience.id} />
      ))}
    </ul>
  );
}

const ReportbuilderAudience = ({ reportbuilderAudience }: { reportbuilderAudience: CompleteReportbuilderAudience }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{reportbuilderAudience.className}</div>
      </div>
      <ReportbuilderAudienceModal reportbuilderAudience={reportbuilderAudience} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No reportbuilder audiences
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new reportbuilder audience.
      </p>
      <div className="mt-6">
        <ReportbuilderAudienceModal emptyState={true} />
      </div>
    </div>
  );
};

