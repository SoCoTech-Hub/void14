import WorkshopSubmissionList from "@/components/workshopSubmissions/WorkshopSubmissionList";
import NewWorkshopSubmissionModal from "@/components/workshopSubmissions/WorkshopSubmissionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function WorkshopSubmissions() {
  await checkAuth();
  const { workshopSubmissions } = await api.workshopSubmissions.getWorkshopSubmissions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshop Submissions</h1>
        <NewWorkshopSubmissionModal />
      </div>
      <WorkshopSubmissionList workshopSubmissions={workshopSubmissions} />
    </main>
  );
}
