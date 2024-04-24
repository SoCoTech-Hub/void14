"use client";
import { CompleteBlockPosition } from "@/lib/db/schema/blockPositions";
import { trpc } from "@/lib/trpc/client";
import BlockPositionModal from "./BlockPositionModal";


export default function BlockPositionList({ blockPositions }: { blockPositions: CompleteBlockPosition[] }) {
  const { data: b } = trpc.blockPositions.getBlockPositions.useQuery(undefined, {
    initialData: { blockPositions },
    refetchOnMount: false,
  });

  if (b.blockPositions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.blockPositions.map((blockPosition) => (
        <BlockPosition blockPosition={blockPosition} key={blockPosition.blockPosition.id} />
      ))}
    </ul>
  );
}

const BlockPosition = ({ blockPosition }: { blockPosition: CompleteBlockPosition }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{blockPosition.blockPosition.blockInstanceId}</div>
      </div>
      <BlockPositionModal blockPosition={blockPosition.blockPosition} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No block positions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new block position.
      </p>
      <div className="mt-6">
        <BlockPositionModal emptyState={true} />
      </div>
    </div>
  );
};

