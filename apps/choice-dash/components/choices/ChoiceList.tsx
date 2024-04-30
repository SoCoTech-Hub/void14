"use client";
import { CompleteChoice } from "@/lib/db/schema/choices";
import { trpc } from "@/lib/trpc/client";
import ChoiceModal from "./ChoiceModal";


export default function ChoiceList({ choices }: { choices: CompleteChoice[] }) {
  const { data: c } = trpc.choices.getChoices.useQuery(undefined, {
    initialData: { choices },
    refetchOnMount: false,
  });

  if (c.choices.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.choices.map((choice) => (
        <Choice choice={choice} key={choice.id} />
      ))}
    </ul>
  );
}

const Choice = ({ choice }: { choice: CompleteChoice }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{choice.allowMultiple}</div>
      </div>
      <ChoiceModal choice={choice} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No choices
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new choice.
      </p>
      <div className="mt-6">
        <ChoiceModal emptyState={true} />
      </div>
    </div>
  );
};

