import CompetencyUserEvidenceList from "@/components/competencyUserEvidences/CompetencyUserEvidenceList";
import NewCompetencyUserEvidenceModal from "@/components/competencyUserEvidences/CompetencyUserEvidenceModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function CompetencyUserEvidences() {
  await checkAuth();
  const { competencyUserEvidences } = await api.competencyUserEvidences.getCompetencyUserEvidences.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency User Evidences</h1>
        <NewCompetencyUserEvidenceModal />
      </div>
      <CompetencyUserEvidenceList competencyUserEvidences={competencyUserEvidences} />
    </main>
  );
}
