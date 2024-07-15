import ReportbuilderFilterList from "@/components/reportbuilderFilters/ReportbuilderFilterList";
import NewReportbuilderFilterModal from "@/components/reportbuilderFilters/ReportbuilderFilterModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ReportbuilderFilters() {
  await checkAuth();
  const { reportbuilderFilters } = await api.reportbuilderFilters.getReportbuilderFilters.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Reportbuilder Filters</h1>
        <NewReportbuilderFilterModal />
      </div>
      <ReportbuilderFilterList reportbuilderFilters={reportbuilderFilters} />
    </main>
  );
}
