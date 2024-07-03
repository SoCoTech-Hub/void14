"use client";
import { CompleteLockDb } from "@/lib/db/schema/lockDbs";
import { trpc } from "@/lib/trpc/client";
import LockDbModal from "./LockDbModal";


export default function LockDbList({ lockDbs }: { lockDbs: CompleteLockDb[] }) {
  const { data: l } = trpc.lockDbs.getLockDbs.useQuery(undefined, {
    initialData: { lockDbs },
    refetchOnMount: false,
  });

  if (l.lockDbs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.lockDbs.map((lockDb) => (
        <LockDb lockDb={lockDb} key={lockDb.id} />
      ))}
    </ul>
  );
}

const LockDb = ({ lockDb }: { lockDb: CompleteLockDb }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{lockDb.expires.toString()}</div>
      </div>
      <LockDbModal lockDb={lockDb} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lock dbs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lock db.
      </p>
      <div className="mt-6">
        <LockDbModal emptyState={true} />
      </div>
    </div>
  );
};

