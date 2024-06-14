import ScormSeqObjectiveList from "@/components/scormSeqObjectives/ScormSeqObjectiveList";
import NewScormSeqObjectiveModal from "@/components/scormSeqObjectives/ScormSeqObjectiveModal";
import { api } from "@/lib/trpc/api";

export default async function ScormSeqObjectives() {
  const { scormSeqObjectives } = await api.scormSeqObjectives.getScormSeqObjectives.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Scorm Seq Objectives</h1>
        <NewScormSeqObjectiveModal />
      </div>
      <ScormSeqObjectiveList scormSeqObjectives={scormSeqObjectives} />
    </main>
  );
}
