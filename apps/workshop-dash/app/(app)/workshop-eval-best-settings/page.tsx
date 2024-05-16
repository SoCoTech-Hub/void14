import WorkshopEvalBestSettingList from "@/components/workshopEvalBestSettings/WorkshopEvalBestSettingList";
import NewWorkshopEvalBestSettingModal from "@/components/workshopEvalBestSettings/WorkshopEvalBestSettingModal";
import { api } from "@/lib/trpc/api";

export default async function WorkshopEvalBestSettings() {
  const { workshopEvalBestSettings } = await api.workshopEvalBestSettings.getWorkshopEvalBestSettings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshop Eval Best Settings</h1>
        <NewWorkshopEvalBestSettingModal />
      </div>
      <WorkshopEvalBestSettingList workshopEvalBestSettings={workshopEvalBestSettings} />
    </main>
  );
}
