"use client";
import { CompleteContext } from "@soco/context-db/schema/contexts";
import { trpc } from "@/lib/trpc/client";
import ContextModal from "./ContextModal";


export default function ContextList({ contexts }: { contexts: CompleteContext[] }) {
  const { data: c } = trpc.contexts.getContexts.useQuery(undefined, {
    initialData: { contexts },
    refetchOnMount: false,
  });

  if (c.contexts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.contexts.map((context) => (
        <Context context={context} key={context.id} />
      ))}
    </ul>
  );
}

const Context = ({ context }: { context: CompleteContext }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{context.contextLevel}</div>
      </div>
      <ContextModal context={context} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No contexts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new context.
      </p>
      <div className="mt-6">
        <ContextModal emptyState={true} />
      </div>
    </div>
  );
};

