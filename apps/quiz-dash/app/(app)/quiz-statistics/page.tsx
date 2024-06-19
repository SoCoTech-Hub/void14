import QuizStatisticList from "@/components/quizStatistics/QuizStatisticList";
import NewQuizStatisticModal from "@/components/quizStatistics/QuizStatisticModal";
import { api } from "@/lib/trpc/api";

export default async function QuizStatistics() {
  const { quizStatistics } = await api.quizStatistics.getQuizStatistics.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Quiz Statistics</h1>
        <NewQuizStatisticModal />
      </div>
      <QuizStatisticList quizStatistics={quizStatistics} />
    </main>
  );
}
