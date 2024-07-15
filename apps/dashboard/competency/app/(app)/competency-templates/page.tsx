import CompetencyTemplateList from "@/components/competencyTemplates/CompetencyTemplateList";
import NewCompetencyTemplateModal from "@/components/competencyTemplates/CompetencyTemplateModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function CompetencyTemplates() {
  await checkAuth();
  const { competencyTemplates } = await api.competencyTemplates.getCompetencyTemplates.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency Templates</h1>
        <NewCompetencyTemplateModal />
      </div>
      <CompetencyTemplateList competencyTemplates={competencyTemplates} />
    </main>
  );
}
