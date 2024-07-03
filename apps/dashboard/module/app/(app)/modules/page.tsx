import ModuleList from "@/components/modules/ModuleList";
import NewModuleModal from "@/components/modules/ModuleModal";
import { api } from "@/lib/trpc/api";

export default async function Modules() {
  const { modules } = await api.modules.getModules.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Modules</h1>
        <NewModuleModal />
      </div>
      <ModuleList modules={modules} />
    </main>
  );
}
