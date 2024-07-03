import AssignList from "@/components/assigns/AssignList";
import NewAssignModal from "@/components/assigns/AssignModal";
import { api } from "@/lib/trpc/api";

export default async function Assigns() {
  const { assigns } = await api.assigns.getAssigns.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assigns</h1>
        <NewAssignModal />
      </div>
      <AssignList assigns={assigns} />
    </main>
  );
}
