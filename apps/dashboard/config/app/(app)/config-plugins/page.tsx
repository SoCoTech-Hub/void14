import ConfigPluginList from "@/components/configPlugins/ConfigPluginList";
import NewConfigPluginModal from "@/components/configPlugins/ConfigPluginModal";
import { api } from "@/lib/trpc/api";

export default async function ConfigPlugins() {
  const { configPlugins } = await api.configPlugins.getConfigPlugins.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Config Plugins</h1>
        <NewConfigPluginModal />
      </div>
      <ConfigPluginList configPlugins={configPlugins} />
    </main>
  );
}
