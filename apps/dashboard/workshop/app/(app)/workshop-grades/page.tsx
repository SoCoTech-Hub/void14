import WorkshopGradeList from "@/components/workshopGrades/WorkshopGradeList";
import NewWorkshopGradeModal from "@/components/workshopGrades/WorkshopGradeModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function WorkshopGrades() {
  await checkAuth();
  const { workshopGrades } = await api.workshopGrades.getWorkshopGrades.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshop Grades</h1>
        <NewWorkshopGradeModal />
      </div>
      <WorkshopGradeList workshopGrades={workshopGrades} />
    </main>
  );
}
