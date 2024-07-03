import ToolCustomLangList from "@/components/toolCustomLangs/ToolCustomLangList";
import NewToolCustomLangModal from "@/components/toolCustomLangs/ToolCustomLangModal";
import { api } from "@/lib/trpc/api";

export default async function ToolCustomLangs() {
  const { toolCustomLangs } = await api.toolCustomLangs.getToolCustomLangs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Custom Langs</h1>
        <NewToolCustomLangModal />
      </div>
      <ToolCustomLangList toolCustomLangs={toolCustomLangs} />
    </main>
  );
}
