"use client";
import { CompleteReportbuilderSchedule } from "@/lib/db/schema/reportbuilderSchedules";
import { trpc } from "@/lib/trpc/client";
import ReportbuilderScheduleModal from "./ReportbuilderScheduleModal";


export default function ReportbuilderScheduleList({ reportbuilderSchedules }: { reportbuilderSchedules: CompleteReportbuilderSchedule[] }) {
  const { data: r } = trpc.reportbuilderSchedules.getReportbuilderSchedules.useQuery(undefined, {
    initialData: { reportbuilderSchedules },
    refetchOnMount: false,
  });

  if (r.reportbuilderSchedules.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.reportbuilderSchedules.map((reportbuilderSchedule) => (
        <ReportbuilderSchedule reportbuilderSchedule={reportbuilderSchedule} key={reportbuilderSchedule.id} />
      ))}
    </ul>
  );
}

const ReportbuilderSchedule = ({ reportbuilderSchedule }: { reportbuilderSchedule: CompleteReportbuilderSchedule }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{reportbuilderSchedule.audiences}</div>
      </div>
      <ReportbuilderScheduleModal reportbuilderSchedule={reportbuilderSchedule} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No reportbuilder schedules
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new reportbuilder schedule.
      </p>
      <div className="mt-6">
        <ReportbuilderScheduleModal emptyState={true} />
      </div>
    </div>
  );
};

