import AnalyticsUsedFileList from "@/components/analyticsUsedFiles/AnalyticsUsedFileList";
import NewAnalyticsUsedFileModal from "@/components/analyticsUsedFiles/AnalyticsUsedFileModal";
import { api } from "@/lib/trpc/api";

export default async function AnalyticsUsedFiles() {
  const { analyticsUsedFiles } = await api.analyticsUsedFiles.getAnalyticsUsedFiles.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Analytics Used Files</h1>
        <NewAnalyticsUsedFileModal />
      </div>
      <AnalyticsUsedFileList analyticsUsedFiles={analyticsUsedFiles} />
    </main>
  );
}
