import LtiToolSettingList from "@/components/ltiToolSettings/LtiToolSettingList";
import NewLtiToolSettingModal from "@/components/ltiToolSettings/LtiToolSettingModal";
import { api } from "@/lib/trpc/api";

export default async function LtiToolSettings() {
  const { ltiToolSettings } = await api.ltiToolSettings.getLtiToolSettings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lti Tool Settings</h1>
        <NewLtiToolSettingModal />
      </div>
      <LtiToolSettingList ltiToolSettings={ltiToolSettings} />
    </main>
  );
}
