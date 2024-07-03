import QuizReportList from "@/components/quizReports/QuizReportList";
import NewQuizReportModal from "@/components/quizReports/QuizReportModal";
import { api } from "@/lib/trpc/api";

export default async function QuizReports() {
  const { quizReports } = await api.quizReports.getQuizReports.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Quiz Reports</h1>
        <NewQuizReportModal />
      </div>
      <QuizReportList quizReports={quizReports} />
    </main>
  );
}
