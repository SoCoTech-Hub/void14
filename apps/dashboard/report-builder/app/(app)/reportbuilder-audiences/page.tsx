import ReportbuilderAudienceList from "@/components/reportbuilderAudiences/ReportbuilderAudienceList";
import NewReportbuilderAudienceModal from "@/components/reportbuilderAudiences/ReportbuilderAudienceModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ReportbuilderAudiences() {
  await checkAuth();
  const { reportbuilderAudiences } = await api.reportbuilderAudiences.getReportbuilderAudiences.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Reportbuilder Audiences</h1>
        <NewReportbuilderAudienceModal />
      </div>
      <ReportbuilderAudienceList reportbuilderAudiences={reportbuilderAudiences} />
    </main>
  );
}
