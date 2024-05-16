import WorkshopAssessmentList from "@/components/workshopAssessments/WorkshopAssessmentList";
import NewWorkshopAssessmentModal from "@/components/workshopAssessments/WorkshopAssessmentModal";
import { api } from "@/lib/trpc/api";

export default async function WorkshopAssessments() {
  const { workshopAssessments } = await api.workshopAssessments.getWorkshopAssessments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshop Assessments</h1>
        <NewWorkshopAssessmentModal />
      </div>
      <WorkshopAssessmentList workshopAssessments={workshopAssessments} />
    </main>
  );
}
