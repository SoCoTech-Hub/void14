"use client";
import { CompleteWikiLock } from "@soco/wiki-db/schema/wikiLocks";
import { trpc } from "@/lib/trpc/client";
import WikiLockModal from "./WikiLockModal";


export default function WikiLockList({ wikiLocks }: { wikiLocks: CompleteWikiLock[] }) {
  const { data: w } = trpc.wikiLocks.getWikiLocks.useQuery(undefined, {
    initialData: { wikiLocks },
    refetchOnMount: false,
  });

  if (w.wikiLocks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.wikiLocks.map((wikiLock) => (
        <WikiLock wikiLock={wikiLock} key={wikiLock.wikiLock.id} />
      ))}
    </ul>
  );
}

const WikiLock = ({ wikiLock }: { wikiLock: CompleteWikiLock }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{wikiLock.wikiLock.lockeDate.toString()}</div>
      </div>
      <WikiLockModal wikiLock={wikiLock.wikiLock} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No wiki locks
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new wiki lock.
      </p>
      <div className="mt-6">
        <WikiLockModal emptyState={true} />
      </div>
    </div>
  );
};

