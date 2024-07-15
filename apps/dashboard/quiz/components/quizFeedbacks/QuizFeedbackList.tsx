"use client";
import { CompleteQuizFeedback } from "@soco/quiz-db/schema/quizFeedbacks";
import { trpc } from "@/lib/trpc/client";
import QuizFeedbackModal from "./QuizFeedbackModal";


export default function QuizFeedbackList({ quizFeedbacks }: { quizFeedbacks: CompleteQuizFeedback[] }) {
  const { data: q } = trpc.quizFeedbacks.getQuizFeedbacks.useQuery(undefined, {
    initialData: { quizFeedbacks },
    refetchOnMount: false,
  });

  if (q.quizFeedbacks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.quizFeedbacks.map((quizFeedback) => (
        <QuizFeedback quizFeedback={quizFeedback} key={quizFeedback.quizFeedback.id} />
      ))}
    </ul>
  );
}

const QuizFeedback = ({ quizFeedback }: { quizFeedback: CompleteQuizFeedback }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{quizFeedback.quizFeedback.feedbackText}</div>
      </div>
      <QuizFeedbackModal quizFeedback={quizFeedback.quizFeedback} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No quiz feedbacks
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new quiz feedback.
      </p>
      <div className="mt-6">
        <QuizFeedbackModal emptyState={true} />
      </div>
    </div>
  );
};

