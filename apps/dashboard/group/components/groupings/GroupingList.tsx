"use client";
import { CompleteGrouping } from "@soco/group-db/schema/groupings";
import { trpc } from "@/lib/trpc/client";
import GroupingModal from "./GroupingModal";


export default function GroupingList({ groupings }: { groupings: CompleteGrouping[] }) {
  const { data: g } = trpc.groupings.getGroupings.useQuery(undefined, {
    initialData: { groupings },
    refetchOnMount: false,
  });

  if (g.groupings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.groupings.map((grouping) => (
        <Grouping grouping={grouping} key={grouping.id} />
      ))}
    </ul>
  );
}

const Grouping = ({ grouping }: { grouping: CompleteGrouping }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{grouping.configData}</div>
      </div>
      <GroupingModal grouping={grouping} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No groupings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grouping.
      </p>
      <div className="mt-6">
        <GroupingModal emptyState={true} />
      </div>
    </div>
  );
};

