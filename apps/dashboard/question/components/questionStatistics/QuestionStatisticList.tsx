"use client";
import { CompleteQuestionStatistic } from "@/lib/db/schema/questionStatistics";
import { trpc } from "@/lib/trpc/client";
import QuestionStatisticModal from "./QuestionStatisticModal";


export default function QuestionStatisticList({ questionStatistics }: { questionStatistics: CompleteQuestionStatistic[] }) {
  const { data: q } = trpc.questionStatistics.getQuestionStatistics.useQuery(undefined, {
    initialData: { questionStatistics },
    refetchOnMount: false,
  });

  if (q.questionStatistics.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionStatistics.map((questionStatistic) => (
        <QuestionStatistic questionStatistic={questionStatistic} key={questionStatistic.questionStatistic.id} />
      ))}
    </ul>
  );
}

const QuestionStatistic = ({ questionStatistic }: { questionStatistic: CompleteQuestionStatistic }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionStatistic.questionStatistic.discriminationIndex}</div>
      </div>
      <QuestionStatisticModal questionStatistic={questionStatistic.questionStatistic} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question statistics
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question statistic.
      </p>
      <div className="mt-6">
        <QuestionStatisticModal emptyState={true} />
      </div>
    </div>
  );
};

