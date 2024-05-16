import WorkshopAllocationScheduleList from "@/components/workshopAllocationSchedules/WorkshopAllocationScheduleList";
import NewWorkshopAllocationScheduleModal from "@/components/workshopAllocationSchedules/WorkshopAllocationScheduleModal";
import { api } from "@/lib/trpc/api";

export default async function WorkshopAllocationSchedules() {
  const { workshopAllocationSchedules } = await api.workshopAllocationSchedules.getWorkshopAllocationSchedules.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshop Allocation Schedules</h1>
        <NewWorkshopAllocationScheduleModal />
      </div>
      <WorkshopAllocationScheduleList workshopAllocationSchedules={workshopAllocationSchedules} />
    </main>
  );
}
