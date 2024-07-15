"use client";
import { CompleteScormAiccSession } from "@soco/scorm-db/schema/scormAiccSessions";
import { trpc } from "@/lib/trpc/client";
import ScormAiccSessionModal from "./ScormAiccSessionModal";


export default function ScormAiccSessionList({ scormAiccSessions }: { scormAiccSessions: CompleteScormAiccSession[] }) {
  const { data: s } = trpc.scormAiccSessions.getScormAiccSessions.useQuery(undefined, {
    initialData: { scormAiccSessions },
    refetchOnMount: false,
  });

  if (s.scormAiccSessions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scormAiccSessions.map((scormAiccSession) => (
        <ScormAiccSession scormAiccSession={scormAiccSession} key={scormAiccSession.scormAiccSession.id} />
      ))}
    </ul>
  );
}

const ScormAiccSession = ({ scormAiccSession }: { scormAiccSession: CompleteScormAiccSession }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scormAiccSession.scormAiccSession.attempt}</div>
      </div>
      <ScormAiccSessionModal scormAiccSession={scormAiccSession.scormAiccSession} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No scorm aicc sessions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new scorm aicc session.
      </p>
      <div className="mt-6">
        <ScormAiccSessionModal emptyState={true} />
      </div>
    </div>
  );
};

