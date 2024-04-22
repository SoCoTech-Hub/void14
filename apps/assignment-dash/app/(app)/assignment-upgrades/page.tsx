import AssignmentUpgradeList from "@/components/assignmentUpgrades/AssignmentUpgradeList";
import NewAssignmentUpgradeModal from "@/components/assignmentUpgrades/AssignmentUpgradeModal";
import { api } from "@/lib/trpc/api";

export default async function AssignmentUpgrades() {
  const { assignmentUpgrades } = await api.assignmentUpgrades.getAssignmentUpgrades.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assignment Upgrades</h1>
        <NewAssignmentUpgradeModal />
      </div>
      <AssignmentUpgradeList assignmentUpgrades={assignmentUpgrades} />
    </main>
  );
}
