import AssignFeedbackEditpdfAnnotList from "@/components/assignFeedbackEditpdfAnnots/AssignFeedbackEditpdfAnnotList";
import NewAssignFeedbackEditpdfAnnotModal from "@/components/assignFeedbackEditpdfAnnots/AssignFeedbackEditpdfAnnotModal";
import { api } from "@/lib/trpc/api";

export default async function AssignFeedbackEditpdfAnnots() {
  const { assignFeedbackEditpdfAnnots } = await api.assignFeedbackEditpdfAnnots.getAssignFeedbackEditpdfAnnots.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign Feedback Editpdf Annots</h1>
        <NewAssignFeedbackEditpdfAnnotModal />
      </div>
      <AssignFeedbackEditpdfAnnotList assignFeedbackEditpdfAnnots={assignFeedbackEditpdfAnnots} />
    </main>
  );
}
