import CompetencyModuleCompList from "@/components/competencyModuleComps/CompetencyModuleCompList";
import NewCompetencyModuleCompModal from "@/components/competencyModuleComps/CompetencyModuleCompModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function CompetencyModuleComps() {
  await checkAuth();
  const { competencyModuleComps } = await api.competencyModuleComps.getCompetencyModuleComps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency Module Comps</h1>
        <NewCompetencyModuleCompModal />
      </div>
      <CompetencyModuleCompList competencyModuleComps={competencyModuleComps} />
    </main>
  );
}
