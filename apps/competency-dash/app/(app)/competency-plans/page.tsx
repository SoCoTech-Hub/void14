import CompetencyPlanList from "@/components/competencyPlans/CompetencyPlanList";
import NewCompetencyPlanModal from "@/components/competencyPlans/CompetencyPlanModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function CompetencyPlans() {
  await checkAuth();
  const { competencyPlans } = await api.competencyPlans.getCompetencyPlans.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency Plans</h1>
        <NewCompetencyPlanModal />
      </div>
      <CompetencyPlanList competencyPlans={competencyPlans} />
    </main>
  );
}
