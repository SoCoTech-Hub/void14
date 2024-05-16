import WorkshopFormCommentList from "@/components/workshopFormComments/WorkshopFormCommentList";
import NewWorkshopFormCommentModal from "@/components/workshopFormComments/WorkshopFormCommentModal";
import { api } from "@/lib/trpc/api";

export default async function WorkshopFormComments() {
  const { workshopFormComments } = await api.workshopFormComments.getWorkshopFormComments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshop Form Comments</h1>
        <NewWorkshopFormCommentModal />
      </div>
      <WorkshopFormCommentList workshopFormComments={workshopFormComments} />
    </main>
  );
}
