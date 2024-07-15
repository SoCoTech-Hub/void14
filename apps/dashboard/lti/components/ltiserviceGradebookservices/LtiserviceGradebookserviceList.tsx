"use client";
import { CompleteLtiserviceGradebookservice } from "@soco/lti-db/schema/ltiserviceGradebookservices";
import { trpc } from "@/lib/trpc/client";
import LtiserviceGradebookserviceModal from "./LtiserviceGradebookserviceModal";


export default function LtiserviceGradebookserviceList({ ltiserviceGradebookservices }: { ltiserviceGradebookservices: CompleteLtiserviceGradebookservice[] }) {
  const { data: l } = trpc.ltiserviceGradebookservices.getLtiserviceGradebookservices.useQuery(undefined, {
    initialData: { ltiserviceGradebookservices },
    refetchOnMount: false,
  });

  if (l.ltiserviceGradebookservices.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.ltiserviceGradebookservices.map((ltiserviceGradebookservice) => (
        <LtiserviceGradebookservice ltiserviceGradebookservice={ltiserviceGradebookservice} key={ltiserviceGradebookservice.id} />
      ))}
    </ul>
  );
}

const LtiserviceGradebookservice = ({ ltiserviceGradebookservice }: { ltiserviceGradebookservice: CompleteLtiserviceGradebookservice }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{ltiserviceGradebookservice.baseUrl}</div>
      </div>
      <LtiserviceGradebookserviceModal ltiserviceGradebookservice={ltiserviceGradebookservice} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No ltiservice gradebookservices
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new ltiservice gradebookservice.
      </p>
      <div className="mt-6">
        <LtiserviceGradebookserviceModal emptyState={true} />
      </div>
    </div>
  );
};

