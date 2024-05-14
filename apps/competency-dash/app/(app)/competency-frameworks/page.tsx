import CompetencyFrameworkList from "@/components/competencyFrameworks/CompetencyFrameworkList";
import NewCompetencyFrameworkModal from "@/components/competencyFrameworks/CompetencyFrameworkModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function CompetencyFrameworks() {
  await checkAuth();
  const { competencyFrameworks } = await api.competencyFrameworks.getCompetencyFrameworks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency Frameworks</h1>
        <NewCompetencyFrameworkModal />
      </div>
      <CompetencyFrameworkList competencyFrameworks={competencyFrameworks} />
    </main>
  );
}
