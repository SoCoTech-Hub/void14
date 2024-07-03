import ToolUserToursStepList from "@/components/toolUserToursSteps/ToolUserToursStepList";
import NewToolUserToursStepModal from "@/components/toolUserToursSteps/ToolUserToursStepModal";
import { api } from "@/lib/trpc/api";

export default async function ToolUserToursSteps() {
  const { toolUserToursSteps } = await api.toolUserToursSteps.getToolUserToursSteps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool User Tours Steps</h1>
        <NewToolUserToursStepModal />
      </div>
      <ToolUserToursStepList toolUserToursSteps={toolUserToursSteps} />
    </main>
  );
}
