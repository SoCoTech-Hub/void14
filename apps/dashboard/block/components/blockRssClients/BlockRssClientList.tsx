"use client";
import { CompleteBlockRssClient } from "@soco/block-db/schema/blockRssClients";
import { trpc } from "@/lib/trpc/client";
import BlockRssClientModal from "./BlockRssClientModal";


export default function BlockRssClientList({ blockRssClients }: { blockRssClients: CompleteBlockRssClient[] }) {
  const { data: b } = trpc.blockRssClients.getBlockRssClients.useQuery(undefined, {
    initialData: { blockRssClients },
    refetchOnMount: false,
  });

  if (b.blockRssClients.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.blockRssClients.map((blockRssClient) => (
        <BlockRssClient blockRssClient={blockRssClient} key={blockRssClient.id} />
      ))}
    </ul>
  );
}

const BlockRssClient = ({ blockRssClient }: { blockRssClient: CompleteBlockRssClient }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{blockRssClient.description}</div>
      </div>
      <BlockRssClientModal blockRssClient={blockRssClient} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No block rss clients
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new block rss client.
      </p>
      <div className="mt-6">
        <BlockRssClientModal emptyState={true} />
      </div>
    </div>
  );
};

