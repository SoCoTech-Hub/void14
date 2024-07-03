import CompetencyTemplateCompList from "@/components/competencyTemplateComps/CompetencyTemplateCompList";
import NewCompetencyTemplateCompModal from "@/components/competencyTemplateComps/CompetencyTemplateCompModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function CompetencyTemplateComps() {
  await checkAuth();
  const { competencyTemplateComps } = await api.competencyTemplateComps.getCompetencyTemplateComps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency Template Comps</h1>
        <NewCompetencyTemplateCompModal />
      </div>
      <CompetencyTemplateCompList competencyTemplateComps={competencyTemplateComps} />
    </main>
  );
}
