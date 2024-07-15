import ReportbuilderScheduleList from "@/components/reportbuilderSchedules/ReportbuilderScheduleList";
import NewReportbuilderScheduleModal from "@/components/reportbuilderSchedules/ReportbuilderScheduleModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ReportbuilderSchedules() {
  await checkAuth();
  const { reportbuilderSchedules } = await api.reportbuilderSchedules.getReportbuilderSchedules.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Reportbuilder Schedules</h1>
        <NewReportbuilderScheduleModal />
      </div>
      <ReportbuilderScheduleList reportbuilderSchedules={reportbuilderSchedules} />
    </main>
  );
}
