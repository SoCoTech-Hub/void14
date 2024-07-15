"use client";
import { CompleteEnrolLtiLti2ToolProxy } from "@soco/enrol-db/schema/enrolLtiLti2ToolProxys";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiLti2ToolProxyModal from "./EnrolLtiLti2ToolProxyModal";


export default function EnrolLtiLti2ToolProxyList({ enrolLtiLti2ToolProxys }: { enrolLtiLti2ToolProxys: CompleteEnrolLtiLti2ToolProxy[] }) {
  const { data: e } = trpc.enrolLtiLti2ToolProxys.getEnrolLtiLti2ToolProxys.useQuery(undefined, {
    initialData: { enrolLtiLti2ToolProxys },
    refetchOnMount: false,
  });

  if (e.enrolLtiLti2ToolProxys.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiLti2ToolProxys.map((enrolLtiLti2ToolProxy) => (
        <EnrolLtiLti2ToolProxy enrolLtiLti2ToolProxy={enrolLtiLti2ToolProxy} key={enrolLtiLti2ToolProxy.id} />
      ))}
    </ul>
  );
}

const EnrolLtiLti2ToolProxy = ({ enrolLtiLti2ToolProxy }: { enrolLtiLti2ToolProxy: CompleteEnrolLtiLti2ToolProxy }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiLti2ToolProxy.consumerId}</div>
      </div>
      <EnrolLtiLti2ToolProxyModal enrolLtiLti2ToolProxy={enrolLtiLti2ToolProxy} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti lti2 tool proxys
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti lti2 tool proxy.
      </p>
      <div className="mt-6">
        <EnrolLtiLti2ToolProxyModal emptyState={true} />
      </div>
    </div>
  );
};

