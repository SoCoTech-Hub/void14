"use client";
import { CompleteOauth2RefreshToken } from "@/lib/db/schema/oauth2RefreshTokens";
import { trpc } from "@/lib/trpc/client";
import Oauth2RefreshTokenModal from "./Oauth2RefreshTokenModal";


export default function Oauth2RefreshTokenList({ oauth2RefreshTokens }: { oauth2RefreshTokens: CompleteOauth2RefreshToken[] }) {
  const { data: o } = trpc.oauth2RefreshTokens.getOauth2RefreshTokens.useQuery(undefined, {
    initialData: { oauth2RefreshTokens },
    refetchOnMount: false,
  });

  if (o.oauth2RefreshTokens.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {o.oauth2RefreshTokens.map((oauth2RefreshToken) => (
        <Oauth2RefreshToken oauth2RefreshToken={oauth2RefreshToken} key={oauth2RefreshToken.oauth2RefreshToken.id} />
      ))}
    </ul>
  );
}

const Oauth2RefreshToken = ({ oauth2RefreshToken }: { oauth2RefreshToken: CompleteOauth2RefreshToken }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{oauth2RefreshToken.oauth2RefreshToken.oauth2issuerId}</div>
      </div>
      <Oauth2RefreshTokenModal oauth2RefreshToken={oauth2RefreshToken.oauth2RefreshToken} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No oauth2 refresh tokens
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new oauth2 refresh token.
      </p>
      <div className="mt-6">
        <Oauth2RefreshTokenModal emptyState={true} />
      </div>
    </div>
  );
};

