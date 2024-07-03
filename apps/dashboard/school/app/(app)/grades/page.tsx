import GradeList from "@/components/grades/GradeList";
import NewGradeModal from "@/components/grades/GradeModal";
import { api } from "@/lib/trpc/api";

export default async function Grades() {
  const { grades } = await api.grades.getGrades.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grades</h1>
        <NewGradeModal />
      </div>
      <GradeList grades={grades} />
    </main>
  );
}
