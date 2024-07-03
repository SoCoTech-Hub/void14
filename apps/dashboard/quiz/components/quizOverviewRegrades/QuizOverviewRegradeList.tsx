"use client";
import { CompleteQuizOverviewRegrade } from "@/lib/db/schema/quizOverviewRegrades";
import { trpc } from "@/lib/trpc/client";
import QuizOverviewRegradeModal from "./QuizOverviewRegradeModal";


export default function QuizOverviewRegradeList({ quizOverviewRegrades }: { quizOverviewRegrades: CompleteQuizOverviewRegrade[] }) {
  const { data: q } = trpc.quizOverviewRegrades.getQuizOverviewRegrades.useQuery(undefined, {
    initialData: { quizOverviewRegrades },
    refetchOnMount: false,
  });

  if (q.quizOverviewRegrades.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.quizOverviewRegrades.map((quizOverviewRegrade) => (
        <QuizOverviewRegrade quizOverviewRegrade={quizOverviewRegrade} key={quizOverviewRegrade.id} />
      ))}
    </ul>
  );
}

const QuizOverviewRegrade = ({ quizOverviewRegrade }: { quizOverviewRegrade: CompleteQuizOverviewRegrade }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{quizOverviewRegrade.newFraction}</div>
      </div>
      <QuizOverviewRegradeModal quizOverviewRegrade={quizOverviewRegrade} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No quiz overview regrades
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new quiz overview regrade.
      </p>
      <div className="mt-6">
        <QuizOverviewRegradeModal emptyState={true} />
      </div>
    </div>
  );
};

