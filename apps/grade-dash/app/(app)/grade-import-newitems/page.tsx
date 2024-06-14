import GradeImportNewitemList from "@/components/gradeImportNewitems/GradeImportNewitemList";
import NewGradeImportNewitemModal from "@/components/gradeImportNewitems/GradeImportNewitemModal";
import { api } from "@/lib/trpc/api";

export default async function GradeImportNewitems() {
  const { gradeImportNewitems } = await api.gradeImportNewitems.getGradeImportNewitems.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grade Import Newitems</h1>
        <NewGradeImportNewitemModal />
      </div>
      <GradeImportNewitemList gradeImportNewitems={gradeImportNewitems} />
    </main>
  );
}
