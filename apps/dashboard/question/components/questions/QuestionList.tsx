"use client";
import { CompleteQuestion } from "@soco/question-db/schema/questions";
import { trpc } from "@/lib/trpc/client";
import QuestionModal from "./QuestionModal";


export default function QuestionList({ questions }: { questions: CompleteQuestion[] }) {
  const { data: q } = trpc.questions.getQuestions.useQuery(undefined, {
    initialData: { questions },
    refetchOnMount: false,
  });

  if (q.questions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questions.map((question) => (
        <Question question={question} key={question.id} />
      ))}
    </ul>
  );
}

const Question = ({ question }: { question: CompleteQuestion }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{question.defaultMark}</div>
      </div>
      <QuestionModal question={question} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No questions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question.
      </p>
      <div className="mt-6">
        <QuestionModal emptyState={true} />
      </div>
    </div>
  );
};

