"use client";
import { CompleteQuizStatistic } from "@/lib/db/schema/quizStatistics";
import { trpc } from "@/lib/trpc/client";
import QuizStatisticModal from "./QuizStatisticModal";


export default function QuizStatisticList({ quizStatistics }: { quizStatistics: CompleteQuizStatistic[] }) {
  const { data: q } = trpc.quizStatistics.getQuizStatistics.useQuery(undefined, {
    initialData: { quizStatistics },
    refetchOnMount: false,
  });

  if (q.quizStatistics.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.quizStatistics.map((quizStatistic) => (
        <QuizStatistic quizStatistic={quizStatistic} key={quizStatistic.id} />
      ))}
    </ul>
  );
}

const QuizStatistic = ({ quizStatistic }: { quizStatistic: CompleteQuizStatistic }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{quizStatistic.allAttemptsAvg}</div>
      </div>
      <QuizStatisticModal quizStatistic={quizStatistic} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No quiz statistics
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new quiz statistic.
      </p>
      <div className="mt-6">
        <QuizStatisticModal emptyState={true} />
      </div>
    </div>
  );
};

