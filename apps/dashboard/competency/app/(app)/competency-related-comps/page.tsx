import CompetencyRelatedCompList from "@/components/competencyRelatedComps/CompetencyRelatedCompList";
import NewCompetencyRelatedCompModal from "@/components/competencyRelatedComps/CompetencyRelatedCompModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function CompetencyRelatedComps() {
  await checkAuth();
  const { competencyRelatedComps } = await api.competencyRelatedComps.getCompetencyRelatedComps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency Related Comps</h1>
        <NewCompetencyRelatedCompModal />
      </div>
      <CompetencyRelatedCompList competencyRelatedComps={competencyRelatedComps} />
    </main>
  );
}
