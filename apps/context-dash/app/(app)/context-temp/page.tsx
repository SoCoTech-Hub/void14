import ContextTempList from "@/components/contextTemp/ContextTempList";
import NewContextTempModal from "@/components/contextTemp/ContextTempModal";
import { api } from "@/lib/trpc/api";

export default async function ContextTemp() {
  const { contextTemp } = await api.contextTemp.getContextTemp.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Context Temp</h1>
        <NewContextTempModal />
      </div>
      <ContextTempList contextTemp={contextTemp} />
    </main>
  );
}
