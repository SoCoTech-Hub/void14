import QuizaccessSebQuizSettingList from "@/components/quizaccessSebQuizSettings/QuizaccessSebQuizSettingList";
import NewQuizaccessSebQuizSettingModal from "@/components/quizaccessSebQuizSettings/QuizaccessSebQuizSettingModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function QuizaccessSebQuizSettings() {
  await checkAuth();
  const { quizaccessSebQuizSettings } = await api.quizaccessSebQuizSettings.getQuizaccessSebQuizSettings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Quizaccess Seb Quiz Settings</h1>
        <NewQuizaccessSebQuizSettingModal />
      </div>
      <QuizaccessSebQuizSettingList quizaccessSebQuizSettings={quizaccessSebQuizSettings} />
    </main>
  );
}
