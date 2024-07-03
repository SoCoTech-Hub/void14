import CompetencyUserCompList from "@/components/competencyUserComps/CompetencyUserCompList";
import NewCompetencyUserCompModal from "@/components/competencyUserComps/CompetencyUserCompModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function CompetencyUserComps() {
  await checkAuth();
  const { competencyUserComps } = await api.competencyUserComps.getCompetencyUserComps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency User Comps</h1>
        <NewCompetencyUserCompModal />
      </div>
      <CompetencyUserCompList competencyUserComps={competencyUserComps} />
    </main>
  );
}
