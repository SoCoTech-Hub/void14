import GroupingList from "@/components/groupings/GroupingList";
import NewGroupingModal from "@/components/groupings/GroupingModal";
import { api } from "@/lib/trpc/api";

export default async function Groupings() {
  const { groupings } = await api.groupings.getGroupings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Groupings</h1>
        <NewGroupingModal />
      </div>
      <GroupingList groupings={groupings} />
    </main>
  );
}
