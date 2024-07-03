"use client";
import { CompleteLtiAccessToken } from "@/lib/db/schema/ltiAccessTokens";
import { trpc } from "@/lib/trpc/client";
import LtiAccessTokenModal from "./LtiAccessTokenModal";


export default function LtiAccessTokenList({ ltiAccessTokens }: { ltiAccessTokens: CompleteLtiAccessToken[] }) {
  const { data: l } = trpc.ltiAccessTokens.getLtiAccessTokens.useQuery(undefined, {
    initialData: { ltiAccessTokens },
    refetchOnMount: false,
  });

  if (l.ltiAccessTokens.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.ltiAccessTokens.map((ltiAccessToken) => (
        <LtiAccessToken ltiAccessToken={ltiAccessToken} key={ltiAccessToken.id} />
      ))}
    </ul>
  );
}

const LtiAccessToken = ({ ltiAccessToken }: { ltiAccessToken: CompleteLtiAccessToken }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{ltiAccessToken.lastAccess.toString()}</div>
      </div>
      <LtiAccessTokenModal ltiAccessToken={ltiAccessToken} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lti access tokens
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lti access token.
      </p>
      <div className="mt-6">
        <LtiAccessTokenModal emptyState={true} />
      </div>
    </div>
  );
};

