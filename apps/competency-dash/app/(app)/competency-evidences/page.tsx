import CompetencyEvidenceList from "@/components/competencyEvidences/CompetencyEvidenceList";
import NewCompetencyEvidenceModal from "@/components/competencyEvidences/CompetencyEvidenceModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function CompetencyEvidences() {
  await checkAuth();
  const { competencyEvidences } = await api.competencyEvidences.getCompetencyEvidences.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency Evidences</h1>
        <NewCompetencyEvidenceModal />
      </div>
      <CompetencyEvidenceList competencyEvidences={competencyEvidences} />
    </main>
  );
}
