import GroupingsGroupList from "@/components/groupingsGroups/GroupingsGroupList";
import NewGroupingsGroupModal from "@/components/groupingsGroups/GroupingsGroupModal";
import { api } from "@/lib/trpc/api";

export default async function GroupingsGroups() {
  const { groupingsGroups } = await api.groupingsGroups.getGroupingsGroups.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Groupings Groups</h1>
        <NewGroupingsGroupModal />
      </div>
      <GroupingsGroupList groupingsGroups={groupingsGroups} />
    </main>
  );
}
