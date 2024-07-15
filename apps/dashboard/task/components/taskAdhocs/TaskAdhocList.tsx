"use client";
import { CompleteTaskAdhoc } from "@soco/task-db/schema/taskAdhocs";
import { trpc } from "@/lib/trpc/client";
import TaskAdhocModal from "./TaskAdhocModal";


export default function TaskAdhocList({ taskAdhocs }: { taskAdhocs: CompleteTaskAdhoc[] }) {
  const { data: t } = trpc.taskAdhocs.getTaskAdhocs.useQuery(undefined, {
    initialData: { taskAdhocs },
    refetchOnMount: false,
  });

  if (t.taskAdhocs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.taskAdhocs.map((taskAdhoc) => (
        <TaskAdhoc taskAdhoc={taskAdhoc} key={taskAdhoc.id} />
      ))}
    </ul>
  );
}

const TaskAdhoc = ({ taskAdhoc }: { taskAdhoc: CompleteTaskAdhoc }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{taskAdhoc.blocking}</div>
      </div>
      <TaskAdhocModal taskAdhoc={taskAdhoc} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No task adhocs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new task adhoc.
      </p>
      <div className="mt-6">
        <TaskAdhocModal emptyState={true} />
      </div>
    </div>
  );
};

