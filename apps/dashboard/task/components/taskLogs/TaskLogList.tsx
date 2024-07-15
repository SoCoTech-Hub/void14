"use client";
import { CompleteTaskLog } from "@soco/task-db/schema/taskLogs";
import { trpc } from "@/lib/trpc/client";
import TaskLogModal from "./TaskLogModal";


export default function TaskLogList({ taskLogs }: { taskLogs: CompleteTaskLog[] }) {
  const { data: t } = trpc.taskLogs.getTaskLogs.useQuery(undefined, {
    initialData: { taskLogs },
    refetchOnMount: false,
  });

  if (t.taskLogs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.taskLogs.map((taskLog) => (
        <TaskLog taskLog={taskLog} key={taskLog.id} />
      ))}
    </ul>
  );
}

const TaskLog = ({ taskLog }: { taskLog: CompleteTaskLog }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{taskLog.classname}</div>
      </div>
      <TaskLogModal taskLog={taskLog} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No task logs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new task log.
      </p>
      <div className="mt-6">
        <TaskLogModal emptyState={true} />
      </div>
    </div>
  );
};

