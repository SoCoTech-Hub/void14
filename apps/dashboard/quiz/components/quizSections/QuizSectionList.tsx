"use client";
import { CompleteQuizSection } from "@soco/quiz-db/schema/quizSections";
import { trpc } from "@/lib/trpc/client";
import QuizSectionModal from "./QuizSectionModal";


export default function QuizSectionList({ quizSections }: { quizSections: CompleteQuizSection[] }) {
  const { data: q } = trpc.quizSections.getQuizSections.useQuery(undefined, {
    initialData: { quizSections },
    refetchOnMount: false,
  });

  if (q.quizSections.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.quizSections.map((quizSection) => (
        <QuizSection quizSection={quizSection} key={quizSection.quizSection.id} />
      ))}
    </ul>
  );
}

const QuizSection = ({ quizSection }: { quizSection: CompleteQuizSection }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{quizSection.quizSection.firstSlot}</div>
      </div>
      <QuizSectionModal quizSection={quizSection.quizSection} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No quiz sections
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new quiz section.
      </p>
      <div className="mt-6">
        <QuizSectionModal emptyState={true} />
      </div>
    </div>
  );
};

