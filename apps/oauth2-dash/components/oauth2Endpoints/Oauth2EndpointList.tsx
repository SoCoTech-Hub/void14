"use client";
import { CompleteOauth2Endpoint } from "@/lib/db/schema/oauth2Endpoints";
import { trpc } from "@/lib/trpc/client";
import Oauth2EndpointModal from "./Oauth2EndpointModal";


export default function Oauth2EndpointList({ oauth2Endpoints }: { oauth2Endpoints: CompleteOauth2Endpoint[] }) {
  const { data: o } = trpc.oauth2Endpoints.getOauth2Endpoints.useQuery(undefined, {
    initialData: { oauth2Endpoints },
    refetchOnMount: false,
  });

  if (o.oauth2Endpoints.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {o.oauth2Endpoints.map((oauth2Endpoint) => (
        <Oauth2Endpoint oauth2Endpoint={oauth2Endpoint} key={oauth2Endpoint.oauth2Endpoint.id} />
      ))}
    </ul>
  );
}

const Oauth2Endpoint = ({ oauth2Endpoint }: { oauth2Endpoint: CompleteOauth2Endpoint }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{oauth2Endpoint.oauth2Endpoint.oauth2issuerId}</div>
      </div>
      <Oauth2EndpointModal oauth2Endpoint={oauth2Endpoint.oauth2Endpoint} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No oauth2 endpoints
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new oauth2 endpoint.
      </p>
      <div className="mt-6">
        <Oauth2EndpointModal emptyState={true} />
      </div>
    </div>
  );
};

