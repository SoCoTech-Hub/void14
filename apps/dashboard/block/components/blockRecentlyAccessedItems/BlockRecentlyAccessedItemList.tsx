"use client";
import { CompleteBlockRecentlyAccessedItem } from "@soco/block-db/schema/blockRecentlyAccessedItems";
import { trpc } from "@/lib/trpc/client";
import BlockRecentlyAccessedItemModal from "./BlockRecentlyAccessedItemModal";


export default function BlockRecentlyAccessedItemList({ blockRecentlyAccessedItems }: { blockRecentlyAccessedItems: CompleteBlockRecentlyAccessedItem[] }) {
  const { data: b } = trpc.blockRecentlyAccessedItems.getBlockRecentlyAccessedItems.useQuery(undefined, {
    initialData: { blockRecentlyAccessedItems },
    refetchOnMount: false,
  });

  if (b.blockRecentlyAccessedItems.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.blockRecentlyAccessedItems.map((blockRecentlyAccessedItem) => (
        <BlockRecentlyAccessedItem blockRecentlyAccessedItem={blockRecentlyAccessedItem} key={blockRecentlyAccessedItem.id} />
      ))}
    </ul>
  );
}

const BlockRecentlyAccessedItem = ({ blockRecentlyAccessedItem }: { blockRecentlyAccessedItem: CompleteBlockRecentlyAccessedItem }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{blockRecentlyAccessedItem.cmId}</div>
      </div>
      <BlockRecentlyAccessedItemModal blockRecentlyAccessedItem={blockRecentlyAccessedItem} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No block recently accessed items
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new block recently accessed item.
      </p>
      <div className="mt-6">
        <BlockRecentlyAccessedItemModal emptyState={true} />
      </div>
    </div>
  );
};

