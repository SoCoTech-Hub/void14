"use client";
import { CompleteQuestionMultianswer } from "@soco/question-db/schema/questionMultianswers";
import { trpc } from "@/lib/trpc/client";
import QuestionMultianswerModal from "./QuestionMultianswerModal";


export default function QuestionMultianswerList({ questionMultianswers }: { questionMultianswers: CompleteQuestionMultianswer[] }) {
  const { data: q } = trpc.questionMultianswers.getQuestionMultianswers.useQuery(undefined, {
    initialData: { questionMultianswers },
    refetchOnMount: false,
  });

  if (q.questionMultianswers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionMultianswers.map((questionMultianswer) => (
        <QuestionMultianswer questionMultianswer={questionMultianswer} key={questionMultianswer.questionMultianswer.id} />
      ))}
    </ul>
  );
}

const QuestionMultianswer = ({ questionMultianswer }: { questionMultianswer: CompleteQuestionMultianswer }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionMultianswer.questionMultianswer.questionId}</div>
      </div>
      <QuestionMultianswerModal questionMultianswer={questionMultianswer.questionMultianswer} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question multianswers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question multianswer.
      </p>
      <div className="mt-6">
        <QuestionMultianswerModal emptyState={true} />
      </div>
    </div>
  );
};

