import TaskLogList from "@/components/taskLogs/TaskLogList";
import NewTaskLogModal from "@/components/taskLogs/TaskLogModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function TaskLogs() {
  await checkAuth();
  const { taskLogs } = await api.taskLogs.getTaskLogs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Task Logs</h1>
        <NewTaskLogModal />
      </div>
      <TaskLogList taskLogs={taskLogs} />
    </main>
  );
}
