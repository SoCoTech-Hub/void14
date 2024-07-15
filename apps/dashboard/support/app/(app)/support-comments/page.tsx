import SupportCommentList from "@/components/supportComments/SupportCommentList";
import NewSupportCommentModal from "@/components/supportComments/SupportCommentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function SupportComments() {
  await checkAuth();
  const { supportComments } = await api.supportComments.getSupportComments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Support Comments</h1>
        <NewSupportCommentModal />
      </div>
      <SupportCommentList supportComments={supportComments} />
    </main>
  );
}
