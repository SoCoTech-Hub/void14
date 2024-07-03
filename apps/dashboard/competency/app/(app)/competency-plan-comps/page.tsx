import CompetencyPlanCompList from "@/components/competencyPlanComps/CompetencyPlanCompList";
import NewCompetencyPlanCompModal from "@/components/competencyPlanComps/CompetencyPlanCompModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function CompetencyPlanComps() {
  await checkAuth();
  const { competencyPlanComps } = await api.competencyPlanComps.getCompetencyPlanComps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency Plan Comps</h1>
        <NewCompetencyPlanCompModal />
      </div>
      <CompetencyPlanCompList competencyPlanComps={competencyPlanComps} />
    </main>
  );
}
