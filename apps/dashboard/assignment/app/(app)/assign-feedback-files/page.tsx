import AssignFeedbackFileList from "@/components/assignFeedbackFiles/AssignFeedbackFileList";
import NewAssignFeedbackFileModal from "@/components/assignFeedbackFiles/AssignFeedbackFileModal";
import { api } from "@/lib/trpc/api";

export default async function AssignFeedbackFiles() {
  const { assignFeedbackFiles } = await api.assignFeedbackFiles.getAssignFeedbackFiles.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign Feedback Files</h1>
        <NewAssignFeedbackFileModal />
      </div>
      <AssignFeedbackFileList assignFeedbackFiles={assignFeedbackFiles} />
    </main>
  );
}
