"use client";
import { CompleteOauth2Issuer } from "@/lib/db/schema/oauth2Issuers";
import { trpc } from "@/lib/trpc/client";
import Oauth2IssuerModal from "./Oauth2IssuerModal";


export default function Oauth2IssuerList({ oauth2Issuers }: { oauth2Issuers: CompleteOauth2Issuer[] }) {
  const { data: o } = trpc.oauth2Issuers.getOauth2Issuers.useQuery(undefined, {
    initialData: { oauth2Issuers },
    refetchOnMount: false,
  });

  if (o.oauth2Issuers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {o.oauth2Issuers.map((oauth2Issuer) => (
        <Oauth2Issuer oauth2Issuer={oauth2Issuer} key={oauth2Issuer.id} />
      ))}
    </ul>
  );
}

const Oauth2Issuer = ({ oauth2Issuer }: { oauth2Issuer: CompleteOauth2Issuer }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{oauth2Issuer.allowedDomains}</div>
      </div>
      <Oauth2IssuerModal oauth2Issuer={oauth2Issuer} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No oauth2 issuers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new oauth2 issuer.
      </p>
      <div className="mt-6">
        <Oauth2IssuerModal emptyState={true} />
      </div>
    </div>
  );
};

