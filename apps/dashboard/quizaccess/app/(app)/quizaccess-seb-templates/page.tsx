import QuizaccessSebTemplateList from "@/components/quizaccessSebTemplates/QuizaccessSebTemplateList";
import NewQuizaccessSebTemplateModal from "@/components/quizaccessSebTemplates/QuizaccessSebTemplateModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function QuizaccessSebTemplates() {
  await checkAuth();
  const { quizaccessSebTemplates } = await api.quizaccessSebTemplates.getQuizaccessSebTemplates.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Quizaccess Seb Templates</h1>
        <NewQuizaccessSebTemplateModal />
      </div>
      <QuizaccessSebTemplateList quizaccessSebTemplates={quizaccessSebTemplates} />
    </main>
  );
}
