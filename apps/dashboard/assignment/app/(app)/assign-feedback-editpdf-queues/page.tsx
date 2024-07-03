import AssignFeedbackEditpdfQueueList from "@/components/assignFeedbackEditpdfQueues/AssignFeedbackEditpdfQueueList";
import NewAssignFeedbackEditpdfQueueModal from "@/components/assignFeedbackEditpdfQueues/AssignFeedbackEditpdfQueueModal";
import { api } from "@/lib/trpc/api";

export default async function AssignFeedbackEditpdfQueues() {
  const { assignFeedbackEditpdfQueues } = await api.assignFeedbackEditpdfQueues.getAssignFeedbackEditpdfQueues.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign Feedback Editpdf Queues</h1>
        <NewAssignFeedbackEditpdfQueueModal />
      </div>
      <AssignFeedbackEditpdfQueueList assignFeedbackEditpdfQueues={assignFeedbackEditpdfQueues} />
    </main>
  );
}
