"use client";
import { CompleteContextTemp } from "@soco/context-db/schema/contextTemp";
import { trpc } from "@/lib/trpc/client";
import ContextTempModal from "./ContextTempModal";


export default function ContextTempList({ contextTemp }: { contextTemp: CompleteContextTemp[] }) {
  const { data: c } = trpc.contextTemp.getContextTemp.useQuery(undefined, {
    initialData: { contextTemp },
    refetchOnMount: false,
  });

  if (c.contextTemp.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.contextTemp.map((contextTemp) => (
        <ContextTemp contextTemp={contextTemp} key={contextTemp.contextTemp.id} />
      ))}
    </ul>
  );
}

const ContextTemp = ({ contextTemp }: { contextTemp: CompleteContextTemp }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{contextTemp.contextTemp.contextId}</div>
      </div>
      <ContextTempModal contextTemp={contextTemp.contextTemp} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No context temp
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new context temp.
      </p>
      <div className="mt-6">
        <ContextTempModal emptyState={true} />
      </div>
    </div>
  );
};

