import GradingDefinitionList from "@/components/gradingDefinitions/GradingDefinitionList";
import NewGradingDefinitionModal from "@/components/gradingDefinitions/GradingDefinitionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function GradingDefinitions() {
  await checkAuth();
  const { gradingDefinitions } = await api.gradingDefinitions.getGradingDefinitions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grading Definitions</h1>
        <NewGradingDefinitionModal />
      </div>
      <GradingDefinitionList gradingDefinitions={gradingDefinitions} />
    </main>
  );
}
