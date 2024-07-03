import QuizOverrideList from "@/components/quizOverrides/QuizOverrideList";
import NewQuizOverrideModal from "@/components/quizOverrides/QuizOverrideModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function QuizOverrides() {
  await checkAuth();
  const { quizOverrides } = await api.quizOverrides.getQuizOverrides.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Quiz Overrides</h1>
        <NewQuizOverrideModal />
      </div>
      <QuizOverrideList quizOverrides={quizOverrides} />
    </main>
  );
}
