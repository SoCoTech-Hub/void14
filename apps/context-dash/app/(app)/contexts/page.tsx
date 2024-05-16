import ContextList from "@/components/contexts/ContextList";
import NewContextModal from "@/components/contexts/ContextModal";
import { api } from "@/lib/trpc/api";

export default async function Contexts() {
  const { contexts } = await api.contexts.getContexts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Contexts</h1>
        <NewContextModal />
      </div>
      <ContextList contexts={contexts} />
    </main>
  );
}
