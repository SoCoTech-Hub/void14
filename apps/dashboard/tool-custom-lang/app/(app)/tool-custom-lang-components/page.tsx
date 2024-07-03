import ToolCustomLangComponentList from "@/components/toolCustomLangComponents/ToolCustomLangComponentList";
import NewToolCustomLangComponentModal from "@/components/toolCustomLangComponents/ToolCustomLangComponentModal";
import { api } from "@/lib/trpc/api";

export default async function ToolCustomLangComponents() {
  const { toolCustomLangComponents } = await api.toolCustomLangComponents.getToolCustomLangComponents.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Custom Lang Components</h1>
        <NewToolCustomLangComponentModal />
      </div>
      <ToolCustomLangComponentList toolCustomLangComponents={toolCustomLangComponents} />
    </main>
  );
}
