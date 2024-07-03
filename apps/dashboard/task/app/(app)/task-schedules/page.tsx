import TaskScheduleList from "@/components/taskSchedules/TaskScheduleList";
import NewTaskScheduleModal from "@/components/taskSchedules/TaskScheduleModal";
import { api } from "@/lib/trpc/api";

export default async function TaskSchedules() {
  const { taskSchedules } = await api.taskSchedules.getTaskSchedules.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Task Schedules</h1>
        <NewTaskScheduleModal />
      </div>
      <TaskScheduleList taskSchedules={taskSchedules} />
    </main>
  );
}
