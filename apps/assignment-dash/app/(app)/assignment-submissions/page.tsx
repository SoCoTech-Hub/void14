import AssignmentSubmissionList from "@/components/assignmentSubmissions/AssignmentSubmissionList";
import NewAssignmentSubmissionModal from "@/components/assignmentSubmissions/AssignmentSubmissionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function AssignmentSubmissions() {
  await checkAuth();
  const { assignmentSubmissions } = await api.assignmentSubmissions.getAssignmentSubmissions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assignment Submissions</h1>
        <NewAssignmentSubmissionModal />
      </div>
      <AssignmentSubmissionList assignmentSubmissions={assignmentSubmissions} />
    </main>
  );
}
