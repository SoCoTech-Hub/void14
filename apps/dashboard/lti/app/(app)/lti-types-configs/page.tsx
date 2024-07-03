import LtiTypesConfigList from "@/components/ltiTypesConfigs/LtiTypesConfigList";
import NewLtiTypesConfigModal from "@/components/ltiTypesConfigs/LtiTypesConfigModal";
import { api } from "@/lib/trpc/api";

export default async function LtiTypesConfigs() {
  const { ltiTypesConfigs } = await api.ltiTypesConfigs.getLtiTypesConfigs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lti Types Configs</h1>
        <NewLtiTypesConfigModal />
      </div>
      <LtiTypesConfigList ltiTypesConfigs={ltiTypesConfigs} />
    </main>
  );
}
