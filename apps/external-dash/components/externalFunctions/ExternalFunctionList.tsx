"use client";
import { CompleteExternalFunction } from "@/lib/db/schema/externalFunctions";
import { trpc } from "@/lib/trpc/client";
import ExternalFunctionModal from "./ExternalFunctionModal";


export default function ExternalFunctionList({ externalFunctions }: { externalFunctions: CompleteExternalFunction[] }) {
  const { data: e } = trpc.externalFunctions.getExternalFunctions.useQuery(undefined, {
    initialData: { externalFunctions },
    refetchOnMount: false,
  });

  if (e.externalFunctions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.externalFunctions.map((externalFunction) => (
        <ExternalFunction externalFunction={externalFunction} key={externalFunction.id} />
      ))}
    </ul>
  );
}

const ExternalFunction = ({ externalFunction }: { externalFunction: CompleteExternalFunction }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{externalFunction.capabilities}</div>
      </div>
      <ExternalFunctionModal externalFunction={externalFunction} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No external functions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new external function.
      </p>
      <div className="mt-6">
        <ExternalFunctionModal emptyState={true} />
      </div>
    </div>
  );
};

