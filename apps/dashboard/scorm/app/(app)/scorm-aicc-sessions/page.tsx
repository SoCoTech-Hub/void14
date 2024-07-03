import ScormAiccSessionList from "@/components/scormAiccSessions/ScormAiccSessionList";
import NewScormAiccSessionModal from "@/components/scormAiccSessions/ScormAiccSessionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ScormAiccSessions() {
  await checkAuth();
  const { scormAiccSessions } = await api.scormAiccSessions.getScormAiccSessions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Scorm Aicc Sessions</h1>
        <NewScormAiccSessionModal />
      </div>
      <ScormAiccSessionList scormAiccSessions={scormAiccSessions} />
    </main>
  );
}
