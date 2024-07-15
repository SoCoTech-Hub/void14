"use client";
import { CompleteLtiToolProxy } from "@soco/lti-db/schema/ltiToolProxies";
import { trpc } from "@/lib/trpc/client";
import LtiToolProxyModal from "./LtiToolProxyModal";


export default function LtiToolProxyList({ ltiToolProxies }: { ltiToolProxies: CompleteLtiToolProxy[] }) {
  const { data: l } = trpc.ltiToolProxies.getLtiToolProxies.useQuery(undefined, {
    initialData: { ltiToolProxies },
    refetchOnMount: false,
  });

  if (l.ltiToolProxies.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.ltiToolProxies.map((ltiToolProxy) => (
        <LtiToolProxy ltiToolProxy={ltiToolProxy} key={ltiToolProxy.id} />
      ))}
    </ul>
  );
}

const LtiToolProxy = ({ ltiToolProxy }: { ltiToolProxy: CompleteLtiToolProxy }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{ltiToolProxy.capabilityOffered}</div>
      </div>
      <LtiToolProxyModal ltiToolProxy={ltiToolProxy} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lti tool proxies
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lti tool proxy.
      </p>
      <div className="mt-6">
        <LtiToolProxyModal emptyState={true} />
      </div>
    </div>
  );
};

