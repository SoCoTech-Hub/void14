import CompetencyUserCompCourseList from "@/components/competencyUserCompCourses/CompetencyUserCompCourseList";
import NewCompetencyUserCompCourseModal from "@/components/competencyUserCompCourses/CompetencyUserCompCourseModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function CompetencyUserCompCourses() {
  await checkAuth();
  const { competencyUserCompCourses } = await api.competencyUserCompCourses.getCompetencyUserCompCourses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Competency User Comp Courses</h1>
        <NewCompetencyUserCompCourseModal />
      </div>
      <CompetencyUserCompCourseList competencyUserCompCourses={competencyUserCompCourses} />
    </main>
  );
}
