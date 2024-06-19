"use client";
import { CompleteQuizReport } from "@/lib/db/schema/quizReports";
import { trpc } from "@/lib/trpc/client";
import QuizReportModal from "./QuizReportModal";


export default function QuizReportList({ quizReports }: { quizReports: CompleteQuizReport[] }) {
  const { data: q } = trpc.quizReports.getQuizReports.useQuery(undefined, {
    initialData: { quizReports },
    refetchOnMount: false,
  });

  if (q.quizReports.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.quizReports.map((quizReport) => (
        <QuizReport quizReport={quizReport} key={quizReport.id} />
      ))}
    </ul>
  );
}

const QuizReport = ({ quizReport }: { quizReport: CompleteQuizReport }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{quizReport.capability}</div>
      </div>
      <QuizReportModal quizReport={quizReport} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No quiz reports
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new quiz report.
      </p>
      <div className="mt-6">
        <QuizReportModal emptyState={true} />
      </div>
    </div>
  );
};

