"use client";
import { CompleteQuestionNumericalUnit } from "@/lib/db/schema/questionNumericalUnits";
import { trpc } from "@/lib/trpc/client";
import QuestionNumericalUnitModal from "./QuestionNumericalUnitModal";


export default function QuestionNumericalUnitList({ questionNumericalUnits }: { questionNumericalUnits: CompleteQuestionNumericalUnit[] }) {
  const { data: q } = trpc.questionNumericalUnits.getQuestionNumericalUnits.useQuery(undefined, {
    initialData: { questionNumericalUnits },
    refetchOnMount: false,
  });

  if (q.questionNumericalUnits.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.questionNumericalUnits.map((questionNumericalUnit) => (
        <QuestionNumericalUnit questionNumericalUnit={questionNumericalUnit} key={questionNumericalUnit.questionNumericalUnit.id} />
      ))}
    </ul>
  );
}

const QuestionNumericalUnit = ({ questionNumericalUnit }: { questionNumericalUnit: CompleteQuestionNumericalUnit }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{questionNumericalUnit.questionNumericalUnit.multiplier}</div>
      </div>
      <QuestionNumericalUnitModal questionNumericalUnit={questionNumericalUnit.questionNumericalUnit} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No question numerical units
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new question numerical unit.
      </p>
      <div className="mt-6">
        <QuestionNumericalUnitModal emptyState={true} />
      </div>
    </div>
  );
};

