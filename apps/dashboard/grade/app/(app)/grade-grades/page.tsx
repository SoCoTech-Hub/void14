import GradeGradeList from "@/components/gradeGrades/GradeGradeList";
import NewGradeGradeModal from "@/components/gradeGrades/GradeGradeModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function GradeGrades() {
  await checkAuth();
  const { gradeGrades } = await api.gradeGrades.getGradeGrades.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grade Grades</h1>
        <NewGradeGradeModal />
      </div>
      <GradeGradeList gradeGrades={gradeGrades} />
    </main>
  );
}
