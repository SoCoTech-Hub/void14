"use client";
import { CompleteQuizOverride } from "@/lib/db/schema/quizOverrides";
import { trpc } from "@/lib/trpc/client";
import QuizOverrideModal from "./QuizOverrideModal";


export default function QuizOverrideList({ quizOverrides }: { quizOverrides: CompleteQuizOverride[] }) {
  const { data: q } = trpc.quizOverrides.getQuizOverrides.useQuery(undefined, {
    initialData: { quizOverrides },
    refetchOnMount: false,
  });

  if (q.quizOverrides.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.quizOverrides.map((quizOverride) => (
        <QuizOverride quizOverride={quizOverride} key={quizOverride.quizOverride.id} />
      ))}
    </ul>
  );
}

const QuizOverride = ({ quizOverride }: { quizOverride: CompleteQuizOverride }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{quizOverride.quizOverride.attempts}</div>
      </div>
      <QuizOverrideModal quizOverride={quizOverride.quizOverride} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No quiz overrides
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new quiz override.
      </p>
      <div className="mt-6">
        <QuizOverrideModal emptyState={true} />
      </div>
    </div>
  );
};

