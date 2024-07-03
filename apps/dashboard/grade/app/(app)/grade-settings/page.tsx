import GradeSettingList from "@/components/gradeSettings/GradeSettingList";
import NewGradeSettingModal from "@/components/gradeSettings/GradeSettingModal";
import { api } from "@/lib/trpc/api";

export default async function GradeSettings() {
  const { gradeSettings } = await api.gradeSettings.getGradeSettings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grade Settings</h1>
        <NewGradeSettingModal />
      </div>
      <GradeSettingList gradeSettings={gradeSettings} />
    </main>
  );
}
