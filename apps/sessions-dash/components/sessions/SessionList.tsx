"use client";
import { CompleteSession } from "@/lib/db/schema/sessions";
import { trpc } from "@/lib/trpc/client";
import SessionModal from "./SessionModal";


export default function SessionList({ sessions }: { sessions: CompleteSession[] }) {
  const { data: s } = trpc.sessions.getSessions.useQuery(undefined, {
    initialData: { sessions },
    refetchOnMount: false,
  });

  if (s.sessions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.sessions.map((session) => (
        <Session session={session} key={session.id} />
      ))}
    </ul>
  );
}

const Session = ({ session }: { session: CompleteSession }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{session.firstIp}</div>
      </div>
      <SessionModal session={session} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No sessions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new session.
      </p>
      <div className="mt-6">
        <SessionModal emptyState={true} />
      </div>
    </div>
  );
};

