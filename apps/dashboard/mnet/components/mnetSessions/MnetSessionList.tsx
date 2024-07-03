"use client";
import { CompleteMnetSession } from "@/lib/db/schema/mnetSessions";
import { trpc } from "@/lib/trpc/client";
import MnetSessionModal from "./MnetSessionModal";


export default function MnetSessionList({ mnetSessions }: { mnetSessions: CompleteMnetSession[] }) {
  const { data: m } = trpc.mnetSessions.getMnetSessions.useQuery(undefined, {
    initialData: { mnetSessions },
    refetchOnMount: false,
  });

  if (m.mnetSessions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.mnetSessions.map((mnetSession) => (
        <MnetSession mnetSession={mnetSession} key={mnetSession.mnetSession.id} />
      ))}
    </ul>
  );
}

const MnetSession = ({ mnetSession }: { mnetSession: CompleteMnetSession }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{mnetSession.mnetSession.confirmTimeout}</div>
      </div>
      <MnetSessionModal mnetSession={mnetSession.mnetSession} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mnet sessions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mnet session.
      </p>
      <div className="mt-6">
        <MnetSessionModal emptyState={true} />
      </div>
    </div>
  );
};

