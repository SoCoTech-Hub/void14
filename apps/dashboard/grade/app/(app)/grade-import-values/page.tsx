import GradeImportValueList from "@/components/gradeImportValues/GradeImportValueList";
import NewGradeImportValueModal from "@/components/gradeImportValues/GradeImportValueModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function GradeImportValues() {
  await checkAuth();
  const { gradeImportValues } = await api.gradeImportValues.getGradeImportValues.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grade Import Values</h1>
        <NewGradeImportValueModal />
      </div>
      <GradeImportValueList gradeImportValues={gradeImportValues} />
    </main>
  );
}
