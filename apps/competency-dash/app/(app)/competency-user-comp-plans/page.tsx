import CompetencyUserCompPlanList from "@/components/competencyUserCompPlans/CompetencyUserCompPlanList";
import NewCompetencyUserCompPlanModal from "@/components/competencyUserCompPlans/CompetencyUserCompPlanModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function CompetencyUserCompPlans() {
  await checkAuth();
  const { competencyUserCompPlans } = await api.competencyUserCompPlans.getCompetencyUserCompPlans.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency User Comp Plans</h1>
        <NewCompetencyUserCompPlanModal />
      </div>
      <CompetencyUserCompPlanList competencyUserCompPlans={competencyUserCompPlans} />
    </main>
  );
}
