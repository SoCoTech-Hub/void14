"use client";
import { CompleteOauth2AccessToken } from "@/lib/db/schema/oauth2AccessTokens";
import { trpc } from "@/lib/trpc/client";
import Oauth2AccessTokenModal from "./Oauth2AccessTokenModal";


export default function Oauth2AccessTokenList({ oauth2AccessTokens }: { oauth2AccessTokens: CompleteOauth2AccessToken[] }) {
  const { data: o } = trpc.oauth2AccessTokens.getOauth2AccessTokens.useQuery(undefined, {
    initialData: { oauth2AccessTokens },
    refetchOnMount: false,
  });

  if (o.oauth2AccessTokens.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {o.oauth2AccessTokens.map((oauth2AccessToken) => (
        <Oauth2AccessToken oauth2AccessToken={oauth2AccessToken} key={oauth2AccessToken.oauth2AccessToken.id} />
      ))}
    </ul>
  );
}

const Oauth2AccessToken = ({ oauth2AccessToken }: { oauth2AccessToken: CompleteOauth2AccessToken }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{oauth2AccessToken.oauth2AccessToken.expires}</div>
      </div>
      <Oauth2AccessTokenModal oauth2AccessToken={oauth2AccessToken.oauth2AccessToken} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No oauth2 access tokens
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new oauth2 access token.
      </p>
      <div className="mt-6">
        <Oauth2AccessTokenModal emptyState={true} />
      </div>
    </div>
  );
};

