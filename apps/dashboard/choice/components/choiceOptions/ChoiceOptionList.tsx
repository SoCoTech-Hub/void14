"use client";
import { CompleteChoiceOption } from "@soco/choice-db/schema/choiceOptions";
import { trpc } from "@/lib/trpc/client";
import ChoiceOptionModal from "./ChoiceOptionModal";


export default function ChoiceOptionList({ choiceOptions }: { choiceOptions: CompleteChoiceOption[] }) {
  const { data: c } = trpc.choiceOptions.getChoiceOptions.useQuery(undefined, {
    initialData: { choiceOptions },
    refetchOnMount: false,
  });

  if (c.choiceOptions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.choiceOptions.map((choiceOption) => (
        <ChoiceOption choiceOption={choiceOption} key={choiceOption.choiceOption.id} />
      ))}
    </ul>
  );
}

const ChoiceOption = ({ choiceOption }: { choiceOption: CompleteChoiceOption }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{choiceOption.choiceOption.maxAnswers}</div>
      </div>
      <ChoiceOptionModal choiceOption={choiceOption.choiceOption} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No choice options
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new choice option.
      </p>
      <div className="mt-6">
        <ChoiceOptionModal emptyState={true} />
      </div>
    </div>
  );
};

