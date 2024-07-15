import CompetencyCourseCompList from "@/components/competencyCourseComps/CompetencyCourseCompList";
import NewCompetencyCourseCompModal from "@/components/competencyCourseComps/CompetencyCourseCompModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function CompetencyCourseComps() {
  await checkAuth();
  const { competencyCourseComps } = await api.competencyCourseComps.getCompetencyCourseComps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency Course Comps</h1>
        <NewCompetencyCourseCompModal />
      </div>
      <CompetencyCourseCompList competencyCourseComps={competencyCourseComps} />
    </main>
  );
}
