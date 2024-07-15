"use client";
import { CompleteQuizGrade } from "@soco/quiz-db/schema/quizGrades";
import { trpc } from "@/lib/trpc/client";
import QuizGradeModal from "./QuizGradeModal";


export default function QuizGradeList({ quizGrades }: { quizGrades: CompleteQuizGrade[] }) {
  const { data: q } = trpc.quizGrades.getQuizGrades.useQuery(undefined, {
    initialData: { quizGrades },
    refetchOnMount: false,
  });

  if (q.quizGrades.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.quizGrades.map((quizGrade) => (
        <QuizGrade quizGrade={quizGrade} key={quizGrade.quizGrade.id} />
      ))}
    </ul>
  );
}

const QuizGrade = ({ quizGrade }: { quizGrade: CompleteQuizGrade }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{quizGrade.quizGrade.grade}</div>
      </div>
      <QuizGradeModal quizGrade={quizGrade.quizGrade} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No quiz grades
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new quiz grade.
      </p>
      <div className="mt-6">
        <QuizGradeModal emptyState={true} />
      </div>
    </div>
  );
};

