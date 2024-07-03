import ScormList from "@/components/scorms/ScormList";
import NewScormModal from "@/components/scorms/ScormModal";
import { api } from "@/lib/trpc/api";

export default async function Scorms() {
  const { scorms } = await api.scorms.getScorms.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Scorms</h1>
        <NewScormModal />
      </div>
      <ScormList scorms={scorms} />
    </main>
  );
}
