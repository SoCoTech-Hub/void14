"use client";
import { CompleteChoiceAnswer } from "@soco/choice-db/schema/choiceAnswers";
import { trpc } from "@/lib/trpc/client";
import ChoiceAnswerModal from "./ChoiceAnswerModal";


export default function ChoiceAnswerList({ choiceAnswers }: { choiceAnswers: CompleteChoiceAnswer[] }) {
  const { data: c } = trpc.choiceAnswers.getChoiceAnswers.useQuery(undefined, {
    initialData: { choiceAnswers },
    refetchOnMount: false,
  });

  if (c.choiceAnswers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.choiceAnswers.map((choiceAnswer) => (
        <ChoiceAnswer choiceAnswer={choiceAnswer} key={choiceAnswer.choiceAnswer.id} />
      ))}
    </ul>
  );
}

const ChoiceAnswer = ({ choiceAnswer }: { choiceAnswer: CompleteChoiceAnswer }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{choiceAnswer.choiceAnswer.choiceOptionId}</div>
      </div>
      <ChoiceAnswerModal choiceAnswer={choiceAnswer.choiceAnswer} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No choice answers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new choice answer.
      </p>
      <div className="mt-6">
        <ChoiceAnswerModal emptyState={true} />
      </div>
    </div>
  );
};

