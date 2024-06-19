import QuizOverviewRegradeList from "@/components/quizOverviewRegrades/QuizOverviewRegradeList";
import NewQuizOverviewRegradeModal from "@/components/quizOverviewRegrades/QuizOverviewRegradeModal";
import { api } from "@/lib/trpc/api";

export default async function QuizOverviewRegrades() {
  const { quizOverviewRegrades } = await api.quizOverviewRegrades.getQuizOverviewRegrades.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Quiz Overview Regrades</h1>
        <NewQuizOverviewRegradeModal />
      </div>
      <QuizOverviewRegradeList quizOverviewRegrades={quizOverviewRegrades} />
    </main>
  );
}
