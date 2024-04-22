import AssignPluginConfigList from "@/components/assignPluginConfigs/AssignPluginConfigList";
import NewAssignPluginConfigModal from "@/components/assignPluginConfigs/AssignPluginConfigModal";
import { api } from "@/lib/trpc/api";

export default async function AssignPluginConfigs() {
  const { assignPluginConfigs } = await api.assignPluginConfigs.getAssignPluginConfigs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign Plugin Configs</h1>
        <NewAssignPluginConfigModal />
      </div>
      <AssignPluginConfigList assignPluginConfigs={assignPluginConfigs} />
    </main>
  );
}
