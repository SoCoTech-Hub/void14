"use client";
import { CompleteLogQuery } from "@soco/log-db/schema/logQueries";
import { trpc } from "@/lib/trpc/client";
import LogQueryModal from "./LogQueryModal";


export default function LogQueryList({ logQueries }: { logQueries: CompleteLogQuery[] }) {
  const { data: l } = trpc.logQueries.getLogQueries.useQuery(undefined, {
    initialData: { logQueries },
    refetchOnMount: false,
  });

  if (l.logQueries.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.logQueries.map((logQuery) => (
        <LogQuery logQuery={logQuery} key={logQuery.id} />
      ))}
    </ul>
  );
}

const LogQuery = ({ logQuery }: { logQuery: CompleteLogQuery }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{logQuery.backTrace}</div>
      </div>
      <LogQueryModal logQuery={logQuery} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No log queries
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new log query.
      </p>
      <div className="mt-6">
        <LogQueryModal emptyState={true} />
      </div>
    </div>
  );
};

