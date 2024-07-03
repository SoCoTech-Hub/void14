import ConfigList from "@/components/configs/ConfigList";
import NewConfigModal from "@/components/configs/ConfigModal";
import { api } from "@/lib/trpc/api";

export default async function Configs() {
  const { configs } = await api.configs.getConfigs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Configs</h1>
        <NewConfigModal />
      </div>
      <ConfigList configs={configs} />
    </main>
  );
}
