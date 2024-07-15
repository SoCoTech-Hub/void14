import CompetencyList from "@/components/competencies/CompetencyList";
import NewCompetencyModal from "@/components/competencies/CompetencyModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Competencies() {
  await checkAuth();
  const { competencies } = await api.competencies.getCompetencies.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competencies</h1>
        <NewCompetencyModal />
      </div>
      <CompetencyList competencies={competencies} />
    </main>
  );
}
