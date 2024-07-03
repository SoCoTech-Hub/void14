import MnetSessionList from "@/components/mnetSessions/MnetSessionList";
import NewMnetSessionModal from "@/components/mnetSessions/MnetSessionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function MnetSessions() {
  await checkAuth();
  const { mnetSessions } = await api.mnetSessions.getMnetSessions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mnet Sessions</h1>
        <NewMnetSessionModal />
      </div>
      <MnetSessionList mnetSessions={mnetSessions} />
    </main>
  );
}
