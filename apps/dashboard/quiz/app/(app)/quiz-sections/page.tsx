import QuizSectionList from "@/components/quizSections/QuizSectionList";
import NewQuizSectionModal from "@/components/quizSections/QuizSectionModal";
import { api } from "@/lib/trpc/api";

export default async function QuizSections() {
  const { quizSections } = await api.quizSections.getQuizSections.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Quiz Sections</h1>
        <NewQuizSectionModal />
      </div>
      <QuizSectionList quizSections={quizSections} />
    </main>
  );
}
