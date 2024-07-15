"use client";
import { CompleteTaskSchedule } from "@soco/task-db/schema/taskSchedules";
import { trpc } from "@/lib/trpc/client";
import TaskScheduleModal from "./TaskScheduleModal";


export default function TaskScheduleList({ taskSchedules }: { taskSchedules: CompleteTaskSchedule[] }) {
  const { data: t } = trpc.taskSchedules.getTaskSchedules.useQuery(undefined, {
    initialData: { taskSchedules },
    refetchOnMount: false,
  });

  if (t.taskSchedules.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.taskSchedules.map((taskSchedule) => (
        <TaskSchedule taskSchedule={taskSchedule} key={taskSchedule.id} />
      ))}
    </ul>
  );
}

const TaskSchedule = ({ taskSchedule }: { taskSchedule: CompleteTaskSchedule }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{taskSchedule.blocking}</div>
      </div>
      <TaskScheduleModal taskSchedule={taskSchedule} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No task schedules
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new task schedule.
      </p>
      <div className="mt-6">
        <TaskScheduleModal emptyState={true} />
      </div>
    </div>
  );
};

