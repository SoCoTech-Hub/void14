import AssignFeedbackCommentList from "@/components/assignFeedbackComments/AssignFeedbackCommentList";
import NewAssignFeedbackCommentModal from "@/components/assignFeedbackComments/AssignFeedbackCommentModal";
import { api } from "@/lib/trpc/api";

export default async function AssignFeedbackComments() {
  const { assignFeedbackComments } = await api.assignFeedbackComments.getAssignFeedbackComments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign Feedback Comments</h1>
        <NewAssignFeedbackCommentModal />
      </div>
      <AssignFeedbackCommentList assignFeedbackComments={assignFeedbackComments} />
    </main>
  );
}
