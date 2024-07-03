import TaskAdhocList from "@/components/taskAdhocs/TaskAdhocList";
import NewTaskAdhocModal from "@/components/taskAdhocs/TaskAdhocModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function TaskAdhocs() {
  await checkAuth();
  const { taskAdhocs } = await api.taskAdhocs.getTaskAdhocs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Task Adhocs</h1>
        <NewTaskAdhocModal />
      </div>
      <TaskAdhocList taskAdhocs={taskAdhocs} />
    </main>
  );
}
