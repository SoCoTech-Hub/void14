"use client";
import { CompleteGradingformRubricFilling } from "@soco/grade-db/schema/gradingformRubricFillings";
import { trpc } from "@/lib/trpc/client";
import GradingformRubricFillingModal from "./GradingformRubricFillingModal";


export default function GradingformRubricFillingList({ gradingformRubricFillings }: { gradingformRubricFillings: CompleteGradingformRubricFilling[] }) {
  const { data: g } = trpc.gradingformRubricFillings.getGradingformRubricFillings.useQuery(undefined, {
    initialData: { gradingformRubricFillings },
    refetchOnMount: false,
  });

  if (g.gradingformRubricFillings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradingformRubricFillings.map((gradingformRubricFilling) => (
        <GradingformRubricFilling gradingformRubricFilling={gradingformRubricFilling} key={gradingformRubricFilling.id} />
      ))}
    </ul>
  );
}

const GradingformRubricFilling = ({ gradingformRubricFilling }: { gradingformRubricFilling: CompleteGradingformRubricFilling }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradingformRubricFilling.criterionId}</div>
      </div>
      <GradingformRubricFillingModal gradingformRubricFilling={gradingformRubricFilling} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No gradingform rubric fillings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new gradingform rubric filling.
      </p>
      <div className="mt-6">
        <GradingformRubricFillingModal emptyState={true} />
      </div>
    </div>
  );
};

