import GradeOutcomeList from "@/components/gradeOutcomes/GradeOutcomeList";
import NewGradeOutcomeModal from "@/components/gradeOutcomes/GradeOutcomeModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function GradeOutcomes() {
  await checkAuth();
  const { gradeOutcomes } = await api.gradeOutcomes.getGradeOutcomes.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grade Outcomes</h1>
        <NewGradeOutcomeModal />
      </div>
      <GradeOutcomeList gradeOutcomes={gradeOutcomes} />
    </main>
  );
}
