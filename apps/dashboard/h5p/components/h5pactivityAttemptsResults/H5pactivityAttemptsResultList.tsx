"use client";
import { CompleteH5pactivityAttemptsResult } from "@soco/h5p-db/schema/h5pactivityAttemptsResults";
import { trpc } from "@/lib/trpc/client";
import H5pactivityAttemptsResultModal from "./H5pactivityAttemptsResultModal";


export default function H5pactivityAttemptsResultList({ h5pactivityAttemptsResults }: { h5pactivityAttemptsResults: CompleteH5pactivityAttemptsResult[] }) {
  const { data: h } = trpc.h5pactivityAttemptsResults.getH5pactivityAttemptsResults.useQuery(undefined, {
    initialData: { h5pactivityAttemptsResults },
    refetchOnMount: false,
  });

  if (h.h5pactivityAttemptsResults.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {h.h5pactivityAttemptsResults.map((h5pactivityAttemptsResult) => (
        <H5pactivityAttemptsResult h5pactivityAttemptsResult={h5pactivityAttemptsResult} key={h5pactivityAttemptsResult.id} />
      ))}
    </ul>
  );
}

const H5pactivityAttemptsResult = ({ h5pactivityAttemptsResult }: { h5pactivityAttemptsResult: CompleteH5pactivityAttemptsResult }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{h5pactivityAttemptsResult.additionals}</div>
      </div>
      <H5pactivityAttemptsResultModal h5pactivityAttemptsResult={h5pactivityAttemptsResult} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No h5pactivity attempts results
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new h5pactivity attempts result.
      </p>
      <div className="mt-6">
        <H5pactivityAttemptsResultModal emptyState={true} />
      </div>
    </div>
  );
};

