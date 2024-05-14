import CompetencyCourseCompSettingList from "@/components/competencyCourseCompSettings/CompetencyCourseCompSettingList";
import NewCompetencyCourseCompSettingModal from "@/components/competencyCourseCompSettings/CompetencyCourseCompSettingModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function CompetencyCourseCompSettings() {
  await checkAuth();
  const { competencyCourseCompSettings } = await api.competencyCourseCompSettings.getCompetencyCourseCompSettings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency Course Comp Settings</h1>
        <NewCompetencyCourseCompSettingModal />
      </div>
      <CompetencyCourseCompSettingList competencyCourseCompSettings={competencyCourseCompSettings} />
    </main>
  );
}
