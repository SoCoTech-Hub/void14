import ToolMonitorEventList from "@/components/toolMonitorEvents/ToolMonitorEventList";
import NewToolMonitorEventModal from "@/components/toolMonitorEvents/ToolMonitorEventModal";
import { api } from "@/lib/trpc/api";

export default async function ToolMonitorEvents() {
  const { toolMonitorEvents } = await api.toolMonitorEvents.getToolMonitorEvents.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Monitor Events</h1>
        <NewToolMonitorEventModal />
      </div>
      <ToolMonitorEventList toolMonitorEvents={toolMonitorEvents} />
    </main>
  );
}
