import ReportbuilderReportList from "@/components/reportbuilderReports/ReportbuilderReportList";
import NewReportbuilderReportModal from "@/components/reportbuilderReports/ReportbuilderReportModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ReportbuilderReports() {
  await checkAuth();
  const { reportbuilderReports } = await api.reportbuilderReports.getReportbuilderReports.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Reportbuilder Reports</h1>
        <NewReportbuilderReportModal />
      </div>
      <ReportbuilderReportList reportbuilderReports={reportbuilderReports} />
    </main>
  );
}
