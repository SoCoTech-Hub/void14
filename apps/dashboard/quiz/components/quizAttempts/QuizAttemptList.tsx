"use client";
import { CompleteQuizAttempt } from "@soco/quiz-db/schema/quizAttempts";
import { trpc } from "@/lib/trpc/client";
import QuizAttemptModal from "./QuizAttemptModal";


export default function QuizAttemptList({ quizAttempts }: { quizAttempts: CompleteQuizAttempt[] }) {
  const { data: q } = trpc.quizAttempts.getQuizAttempts.useQuery(undefined, {
    initialData: { quizAttempts },
    refetchOnMount: false,
  });

  if (q.quizAttempts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.quizAttempts.map((quizAttempt) => (
        <QuizAttempt quizAttempt={quizAttempt} key={quizAttempt.quizAttempt.id} />
      ))}
    </ul>
  );
}

const QuizAttempt = ({ quizAttempt }: { quizAttempt: CompleteQuizAttempt }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{quizAttempt.quizAttempt.attempt}</div>
      </div>
      <QuizAttemptModal quizAttempt={quizAttempt.quizAttempt} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No quiz attempts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new quiz attempt.
      </p>
      <div className="mt-6">
        <QuizAttemptModal emptyState={true} />
      </div>
    </div>
  );
};

