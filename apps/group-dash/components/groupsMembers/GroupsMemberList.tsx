"use client";
import { CompleteGroupsMember } from "@/lib/db/schema/groupsMembers";
import { trpc } from "@/lib/trpc/client";
import GroupsMemberModal from "./GroupsMemberModal";


export default function GroupsMemberList({ groupsMembers }: { groupsMembers: CompleteGroupsMember[] }) {
  const { data: g } = trpc.groupsMembers.getGroupsMembers.useQuery(undefined, {
    initialData: { groupsMembers },
    refetchOnMount: false,
  });

  if (g.groupsMembers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.groupsMembers.map((groupsMember) => (
        <GroupsMember groupsMember={groupsMember} key={groupsMember.id} />
      ))}
    </ul>
  );
}

const GroupsMember = ({ groupsMember }: { groupsMember: CompleteGroupsMember }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{groupsMember.component}</div>
      </div>
      <GroupsMemberModal groupsMember={groupsMember} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No groups members
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new groups member.
      </p>
      <div className="mt-6">
        <GroupsMemberModal emptyState={true} />
      </div>
    </div>
  );
};

