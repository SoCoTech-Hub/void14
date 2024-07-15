"use client";
import { CompleteLessonAnswer } from "@soco/lesson-db/schema/lessonAnswers";
import { trpc } from "@/lib/trpc/client";
import LessonAnswerModal from "./LessonAnswerModal";


export default function LessonAnswerList({ lessonAnswers }: { lessonAnswers: CompleteLessonAnswer[] }) {
  const { data: l } = trpc.lessonAnswers.getLessonAnswers.useQuery(undefined, {
    initialData: { lessonAnswers },
    refetchOnMount: false,
  });

  if (l.lessonAnswers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.lessonAnswers.map((lessonAnswer) => (
        <LessonAnswer lessonAnswer={lessonAnswer} key={lessonAnswer.lessonAnswer.id} />
      ))}
    </ul>
  );
}

const LessonAnswer = ({ lessonAnswer }: { lessonAnswer: CompleteLessonAnswer }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{lessonAnswer.lessonAnswer.answer}</div>
      </div>
      <LessonAnswerModal lessonAnswer={lessonAnswer.lessonAnswer} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lesson answers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lesson answer.
      </p>
      <div className="mt-6">
        <LessonAnswerModal emptyState={true} />
      </div>
    </div>
  );
};

