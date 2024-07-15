"use client";
import { CompleteWorkshopAllocationSchedule } from "@soco/workshop-db/schema/workshopAllocationSchedules";
import { trpc } from "@/lib/trpc/client";
import WorkshopAllocationScheduleModal from "./WorkshopAllocationScheduleModal";


export default function WorkshopAllocationScheduleList({ workshopAllocationSchedules }: { workshopAllocationSchedules: CompleteWorkshopAllocationSchedule[] }) {
  const { data: w } = trpc.workshopAllocationSchedules.getWorkshopAllocationSchedules.useQuery(undefined, {
    initialData: { workshopAllocationSchedules },
    refetchOnMount: false,
  });

  if (w.workshopAllocationSchedules.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshopAllocationSchedules.map((workshopAllocationSchedule) => (
        <WorkshopAllocationSchedule workshopAllocationSchedule={workshopAllocationSchedule} key={workshopAllocationSchedule.workshopAllocationSchedule.id} />
      ))}
    </ul>
  );
}

const WorkshopAllocationSchedule = ({ workshopAllocationSchedule }: { workshopAllocationSchedule: CompleteWorkshopAllocationSchedule }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshopAllocationSchedule.workshopAllocationSchedule.enabled}</div>
      </div>
      <WorkshopAllocationScheduleModal workshopAllocationSchedule={workshopAllocationSchedule.workshopAllocationSchedule} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshop allocation schedules
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop allocation schedule.
      </p>
      <div className="mt-6">
        <WorkshopAllocationScheduleModal emptyState={true} />
      </div>
    </div>
  );
};

