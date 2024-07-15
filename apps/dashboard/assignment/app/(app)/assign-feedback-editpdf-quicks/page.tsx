import AssignFeedbackEditpdfQuickList from "@/components/assignFeedbackEditpdfQuicks/AssignFeedbackEditpdfQuickList";
import NewAssignFeedbackEditpdfQuickModal from "@/components/assignFeedbackEditpdfQuicks/AssignFeedbackEditpdfQuickModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function AssignFeedbackEditpdfQuicks() {
  await checkAuth();
  const { assignFeedbackEditpdfQuicks } = await api.assignFeedbackEditpdfQuicks.getAssignFeedbackEditpdfQuicks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign Feedback Editpdf Quicks</h1>
        <NewAssignFeedbackEditpdfQuickModal />
      </div>
      <AssignFeedbackEditpdfQuickList assignFeedbackEditpdfQuicks={assignFeedbackEditpdfQuicks} />
    </main>
  );
}
