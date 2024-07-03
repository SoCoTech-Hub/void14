import ScormScoeList from "@/components/scormScoes/ScormScoeList";
import NewScormScoeModal from "@/components/scormScoes/ScormScoeModal";
import { api } from "@/lib/trpc/api";

export default async function ScormScoes() {
  const { scormScoes } = await api.scormScoes.getScormScoes.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Scorm Scoes</h1>
        <NewScormScoeModal />
      </div>
      <ScormScoeList scormScoes={scormScoes} />
    </main>
  );
}
