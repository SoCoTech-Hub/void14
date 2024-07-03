import GradingInstanceList from "@/components/gradingInstances/GradingInstanceList";
import NewGradingInstanceModal from "@/components/gradingInstances/GradingInstanceModal";
import { api } from "@/lib/trpc/api";

export default async function GradingInstances() {
  const { gradingInstances } = await api.gradingInstances.getGradingInstances.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grading Instances</h1>
        <NewGradingInstanceModal />
      </div>
      <GradingInstanceList gradingInstances={gradingInstances} />
    </main>
  );
}
