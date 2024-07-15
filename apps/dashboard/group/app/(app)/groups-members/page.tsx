import GroupsMemberList from "@/components/groupsMembers/GroupsMemberList";
import NewGroupsMemberModal from "@/components/groupsMembers/GroupsMemberModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function GroupsMembers() {
  await checkAuth();
  const { groupsMembers } = await api.groupsMembers.getGroupsMembers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Groups Members</h1>
        <NewGroupsMemberModal />
      </div>
      <GroupsMemberList groupsMembers={groupsMembers} />
    </main>
  );
}
