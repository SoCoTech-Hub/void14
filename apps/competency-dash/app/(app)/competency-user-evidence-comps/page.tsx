import CompetencyUserEvidenceCompList from "@/components/competencyUserEvidenceComps/CompetencyUserEvidenceCompList";
import NewCompetencyUserEvidenceCompModal from "@/components/competencyUserEvidenceComps/CompetencyUserEvidenceCompModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function CompetencyUserEvidenceComps() {
  await checkAuth();
  const { competencyUserEvidenceComps } = await api.competencyUserEvidenceComps.getCompetencyUserEvidenceComps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency User Evidence Comps</h1>
        <NewCompetencyUserEvidenceCompModal />
      </div>
      <CompetencyUserEvidenceCompList competencyUserEvidenceComps={competencyUserEvidenceComps} />
    </main>
  );
}
