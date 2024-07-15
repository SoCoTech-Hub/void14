import CompetencyTemplateCohortList from "@/components/competencyTemplateCohorts/CompetencyTemplateCohortList";
import NewCompetencyTemplateCohortModal from "@/components/competencyTemplateCohorts/CompetencyTemplateCohortModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function CompetencyTemplateCohorts() {
  await checkAuth();
  const { competencyTemplateCohorts } = await api.competencyTemplateCohorts.getCompetencyTemplateCohorts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency Template Cohorts</h1>
        <NewCompetencyTemplateCohortModal />
      </div>
      <CompetencyTemplateCohortList competencyTemplateCohorts={competencyTemplateCohorts} />
    </main>
  );
}
