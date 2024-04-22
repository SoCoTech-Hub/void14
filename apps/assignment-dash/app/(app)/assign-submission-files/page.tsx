import AssignSubmissionFileList from "@/components/assignSubmissionFiles/AssignSubmissionFileList";
import NewAssignSubmissionFileModal from "@/components/assignSubmissionFiles/AssignSubmissionFileModal";
import { api } from "@/lib/trpc/api";

export default async function AssignSubmissionFiles() {
  const { assignSubmissionFiles } = await api.assignSubmissionFiles.getAssignSubmissionFiles.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign Submission Files</h1>
        <NewAssignSubmissionFileModal />
      </div>
      <AssignSubmissionFileList assignSubmissionFiles={assignSubmissionFiles} />
    </main>
  );
}
