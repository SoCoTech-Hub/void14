"use client";
import { CompleteBlock } from "@soco/block-db/schema/blocks";
import { trpc } from "@/lib/trpc/client";
import BlockModal from "./BlockModal";


export default function BlockList({ blocks }: { blocks: CompleteBlock[] }) {
  const { data: b } = trpc.blocks.getBlocks.useQuery(undefined, {
    initialData: { blocks },
    refetchOnMount: false,
  });

  if (b.blocks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.blocks.map((block) => (
        <Block block={block} key={block.id} />
      ))}
    </ul>
  );
}

const Block = ({ block }: { block: CompleteBlock }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{block.cronId}</div>
      </div>
      <BlockModal block={block} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No blocks
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new block.
      </p>
      <div className="mt-6">
        <BlockModal emptyState={true} />
      </div>
    </div>
  );
};

