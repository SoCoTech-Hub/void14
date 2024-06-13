import ToolUserToursTourList from "@/components/toolUserToursTours/ToolUserToursTourList";
import NewToolUserToursTourModal from "@/components/toolUserToursTours/ToolUserToursTourModal";
import { api } from "@/lib/trpc/api";

export default async function ToolUserToursTours() {
  const { toolUserToursTours } = await api.toolUserToursTours.getToolUserToursTours.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool User Tours Tours</h1>
        <NewToolUserToursTourModal />
      </div>
      <ToolUserToursTourList toolUserToursTours={toolUserToursTours} />
    </main>
  );
}
