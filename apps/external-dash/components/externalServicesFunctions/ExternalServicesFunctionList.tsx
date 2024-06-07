"use client";
import { CompleteExternalServicesFunction } from "@/lib/db/schema/externalServicesFunctions";
import { trpc } from "@/lib/trpc/client";
import ExternalServicesFunctionModal from "./ExternalServicesFunctionModal";


export default function ExternalServicesFunctionList({ externalServicesFunctions }: { externalServicesFunctions: CompleteExternalServicesFunction[] }) {
  const { data: e } = trpc.externalServicesFunctions.getExternalServicesFunctions.useQuery(undefined, {
    initialData: { externalServicesFunctions },
    refetchOnMount: false,
  });

  if (e.externalServicesFunctions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.externalServicesFunctions.map((externalServicesFunction) => (
        <ExternalServicesFunction externalServicesFunction={externalServicesFunction} key={externalServicesFunction.id} />
      ))}
    </ul>
  );
}

const ExternalServicesFunction = ({ externalServicesFunction }: { externalServicesFunction: CompleteExternalServicesFunction }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{externalServicesFunction.externalServiceId}</div>
      </div>
      <ExternalServicesFunctionModal externalServicesFunction={externalServicesFunction} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No external services functions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new external services function.
      </p>
      <div className="mt-6">
        <ExternalServicesFunctionModal emptyState={true} />
      </div>
    </div>
  );
};

