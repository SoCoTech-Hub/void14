"use client";
import { CompleteBlockRecentActivity } from "@soco/block-db/schema/blockRecentActivities";
import { trpc } from "@/lib/trpc/client";
import BlockRecentActivityModal from "./BlockRecentActivityModal";


export default function BlockRecentActivityList({ blockRecentActivities }: { blockRecentActivities: CompleteBlockRecentActivity[] }) {
  const { data: b } = trpc.blockRecentActivities.getBlockRecentActivities.useQuery(undefined, {
    initialData: { blockRecentActivities },
    refetchOnMount: false,
  });

  if (b.blockRecentActivities.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.blockRecentActivities.map((blockRecentActivity) => (
        <BlockRecentActivity blockRecentActivity={blockRecentActivity} key={blockRecentActivity.id} />
      ))}
    </ul>
  );
}

const BlockRecentActivity = ({ blockRecentActivity }: { blockRecentActivity: CompleteBlockRecentActivity }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{blockRecentActivity.action}</div>
      </div>
      <BlockRecentActivityModal blockRecentActivity={blockRecentActivity} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No block recent activities
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new block recent activity.
      </p>
      <div className="mt-6">
        <BlockRecentActivityModal emptyState={true} />
      </div>
    </div>
  );
};

