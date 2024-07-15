import AssignSubmissionList from "@/components/assignSubmissions/AssignSubmissionList";
import NewAssignSubmissionModal from "@/components/assignSubmissions/AssignSubmissionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function AssignSubmissions() {
  await checkAuth();
  const { assignSubmissions } = await api.assignSubmissions.getAssignSubmissions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign Submissions</h1>
        <NewAssignSubmissionModal />
      </div>
      <AssignSubmissionList assignSubmissions={assignSubmissions} />
    </main>
  );
}
