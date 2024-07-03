import AssignFeedbackEditpdfRotList from "@/components/assignFeedbackEditpdfRots/AssignFeedbackEditpdfRotList";
import NewAssignFeedbackEditpdfRotModal from "@/components/assignFeedbackEditpdfRots/AssignFeedbackEditpdfRotModal";
import { api } from "@/lib/trpc/api";

export default async function AssignFeedbackEditpdfRots() {
  const { assignFeedbackEditpdfRots } = await api.assignFeedbackEditpdfRots.getAssignFeedbackEditpdfRots.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign Feedback Editpdf Rots</h1>
        <NewAssignFeedbackEditpdfRotModal />
      </div>
      <AssignFeedbackEditpdfRotList assignFeedbackEditpdfRots={assignFeedbackEditpdfRots} />
    </main>
  );
}
