import GradeLetterList from "@/components/gradeLetters/GradeLetterList";
import NewGradeLetterModal from "@/components/gradeLetters/GradeLetterModal";
import { api } from "@/lib/trpc/api";

export default async function GradeLetters() {
  const { gradeLetters } = await api.gradeLetters.getGradeLetters.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grade Letters</h1>
        <NewGradeLetterModal />
      </div>
      <GradeLetterList gradeLetters={gradeLetters} />
    </main>
  );
}
