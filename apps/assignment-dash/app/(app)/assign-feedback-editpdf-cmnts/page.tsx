import AssignFeedbackEditpdfCmntList from "@/components/assignFeedbackEditpdfCmnts/AssignFeedbackEditpdfCmntList";
import NewAssignFeedbackEditpdfCmntModal from "@/components/assignFeedbackEditpdfCmnts/AssignFeedbackEditpdfCmntModal";
import { api } from "@/lib/trpc/api";

export default async function AssignFeedbackEditpdfCmnts() {
  const { assignFeedbackEditpdfCmnts } = await api.assignFeedbackEditpdfCmnts.getAssignFeedbackEditpdfCmnts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign Feedback Editpdf Cmnts</h1>
        <NewAssignFeedbackEditpdfCmntModal />
      </div>
      <AssignFeedbackEditpdfCmntList assignFeedbackEditpdfCmnts={assignFeedbackEditpdfCmnts} />
    </main>
  );
}
