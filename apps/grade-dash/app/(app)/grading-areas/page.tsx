import GradingAreaList from "@/components/gradingAreas/GradingAreaList";
import NewGradingAreaModal from "@/components/gradingAreas/GradingAreaModal";
import { api } from "@/lib/trpc/api";

export default async function GradingAreas() {
  const { gradingAreas } = await api.gradingAreas.getGradingAreas.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grading Areas</h1>
        <NewGradingAreaModal />
      </div>
      <GradingAreaList gradingAreas={gradingAreas} />
    </main>
  );
}
