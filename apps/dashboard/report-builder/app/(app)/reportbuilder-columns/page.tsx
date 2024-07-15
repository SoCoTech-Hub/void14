import ReportbuilderColumnList from "@/components/reportbuilderColumns/ReportbuilderColumnList";
import NewReportbuilderColumnModal from "@/components/reportbuilderColumns/ReportbuilderColumnModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ReportbuilderColumns() {
  await checkAuth();
  const { reportbuilderColumns } = await api.reportbuilderColumns.getReportbuilderColumns.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Reportbuilder Columns</h1>
        <NewReportbuilderColumnModal />
      </div>
      <ReportbuilderColumnList reportbuilderColumns={reportbuilderColumns} />
    </main>
  );
}
