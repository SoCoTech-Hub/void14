import SessionList from "@/components/sessions/SessionList";
import NewSessionModal from "@/components/sessions/SessionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Sessions() {
  await checkAuth();
  const { sessions } = await api.sessions.getSessions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Sessions</h1>
        <NewSessionModal />
      </div>
      <SessionList sessions={sessions} />
    </main>
  );
}
