import AssignSubmissionOnlineTextList from "@/components/assignSubmissionOnlineTexts/AssignSubmissionOnlineTextList";
import NewAssignSubmissionOnlineTextModal from "@/components/assignSubmissionOnlineTexts/AssignSubmissionOnlineTextModal";
import { api } from "@/lib/trpc/api";

export default async function AssignSubmissionOnlineTexts() {
  const { assignSubmissionOnlineTexts } = await api.assignSubmissionOnlineTexts.getAssignSubmissionOnlineTexts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign Submission Online Texts</h1>
        <NewAssignSubmissionOnlineTextModal />
      </div>
      <AssignSubmissionOnlineTextList assignSubmissionOnlineTexts={assignSubmissionOnlineTexts} />
    </main>
  );
}
