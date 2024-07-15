"use client";
import { CompleteBlockInstance } from "@soco/block-db/schema/blockInstances";
import { trpc } from "@/lib/trpc/client";
import BlockInstanceModal from "./BlockInstanceModal";


export default function BlockInstanceList({ blockInstances }: { blockInstances: CompleteBlockInstance[] }) {
  const { data: b } = trpc.blockInstances.getBlockInstances.useQuery(undefined, {
    initialData: { blockInstances },
    refetchOnMount: false,
  });

  if (b.blockInstances.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.blockInstances.map((blockInstance) => (
        <BlockInstance blockInstance={blockInstance} key={blockInstance.id} />
      ))}
    </ul>
  );
}

const BlockInstance = ({ blockInstance }: { blockInstance: CompleteBlockInstance }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{blockInstance.blockName}</div>
      </div>
      <BlockInstanceModal blockInstance={blockInstance} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No block instances
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new block instance.
      </p>
      <div className="mt-6">
        <BlockInstanceModal emptyState={true} />
      </div>
    </div>
  );
};

