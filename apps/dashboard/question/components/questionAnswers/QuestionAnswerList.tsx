"use client";
import { CompleteQuestionAnswer } from "@soco/question-db/schema/questionAnswers";
import { trpc } from "@/lib/trpc/client";
import QuestionAnswerModal from "./QuestionAnswerModal";


export default function QuestionAnswerList({ questionAnswers }: { questionAnswers: CompleteQuestionAnswer[] }) {
  const { data: q } = trpc.questionAnswers.getQuestionAnswers.useQuery(undefined, {
    initialData: { questionAnswers },
    refetchOnMount: false,
  });

  if (q.questionAnswers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionAnswers.map((questionAnswer) => (
        <QuestionAnswer questionAnswer={questionAnswer} key={questionAnswer.questionAnswer.id} />
      ))}
    </ul>
  );
}

const QuestionAnswer = ({ questionAnswer }: { questionAnswer: CompleteQuestionAnswer }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionAnswer.questionAnswer.answer}</div>
      </div>
      <QuestionAnswerModal questionAnswer={questionAnswer.questionAnswer} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question answers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question answer.
      </p>
      <div className="mt-6">
        <QuestionAnswerModal emptyState={true} />
      </div>
    </div>
  );
};

