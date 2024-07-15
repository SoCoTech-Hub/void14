"use client";
import { CompleteGroupingsGroup } from "@soco/group-db/schema/groupingsGroups";
import { trpc } from "@/lib/trpc/client";
import GroupingsGroupModal from "./GroupingsGroupModal";


export default function GroupingsGroupList({ groupingsGroups }: { groupingsGroups: CompleteGroupingsGroup[] }) {
  const { data: g } = trpc.groupingsGroups.getGroupingsGroups.useQuery(undefined, {
    initialData: { groupingsGroups },
    refetchOnMount: false,
  });

  if (g.groupingsGroups.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.groupingsGroups.map((groupingsGroup) => (
        <GroupingsGroup groupingsGroup={groupingsGroup} key={groupingsGroup.groupingsGroup.id} />
      ))}
    </ul>
  );
}

const GroupingsGroup = ({ groupingsGroup }: { groupingsGroup: CompleteGroupingsGroup }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{groupingsGroup.groupingsGroup.groupingId}</div>
      </div>
      <GroupingsGroupModal groupingsGroup={groupingsGroup.groupingsGroup} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No groupings groups
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new groupings group.
      </p>
      <div className="mt-6">
        <GroupingsGroupModal emptyState={true} />
      </div>
    </div>
  );
};

