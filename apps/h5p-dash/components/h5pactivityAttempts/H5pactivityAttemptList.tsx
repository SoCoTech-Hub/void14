"use client";
import { CompleteH5pactivityAttempt } from "@/lib/db/schema/h5pactivityAttempts";
import { trpc } from "@/lib/trpc/client";
import H5pactivityAttemptModal from "./H5pactivityAttemptModal";


export default function H5pactivityAttemptList({ h5pactivityAttempts }: { h5pactivityAttempts: CompleteH5pactivityAttempt[] }) {
  const { data: h } = trpc.h5pactivityAttempts.getH5pactivityAttempts.useQuery(undefined, {
    initialData: { h5pactivityAttempts },
    refetchOnMount: false,
  });

  if (h.h5pactivityAttempts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {h.h5pactivityAttempts.map((h5pactivityAttempt) => (
        <H5pactivityAttempt h5pactivityAttempt={h5pactivityAttempt} key={h5pactivityAttempt.id} />
      ))}
    </ul>
  );
}

const H5pactivityAttempt = ({ h5pactivityAttempt }: { h5pactivityAttempt: CompleteH5pactivityAttempt }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{h5pactivityAttempt.attempt}</div>
      </div>
      <H5pactivityAttemptModal h5pactivityAttempt={h5pactivityAttempt} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No h5pactivity attempts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new h5pactivity attempt.
      </p>
      <div className="mt-6">
        <H5pactivityAttemptModal emptyState={true} />
      </div>
    </div>
  );
};

