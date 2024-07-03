"use client";
import { CompleteExternalToken } from "@/lib/db/schema/externalTokens";
import { trpc } from "@/lib/trpc/client";
import ExternalTokenModal from "./ExternalTokenModal";


export default function ExternalTokenList({ externalTokens }: { externalTokens: CompleteExternalToken[] }) {
  const { data: e } = trpc.externalTokens.getExternalTokens.useQuery(undefined, {
    initialData: { externalTokens },
    refetchOnMount: false,
  });

  if (e.externalTokens.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.externalTokens.map((externalToken) => (
        <ExternalToken externalToken={externalToken} key={externalToken.id} />
      ))}
    </ul>
  );
}

const ExternalToken = ({ externalToken }: { externalToken: CompleteExternalToken }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{externalToken.contextId}</div>
      </div>
      <ExternalTokenModal externalToken={externalToken} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No external tokens
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new external token.
      </p>
      <div className="mt-6">
        <ExternalTokenModal emptyState={true} />
      </div>
    </div>
  );
};

