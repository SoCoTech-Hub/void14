"use client";
import { CompleteGradingformGuideCriterion } from "@/lib/db/schema/gradingformGuideCriteria";
import { trpc } from "@/lib/trpc/client";
import GradingformGuideCriterionModal from "./GradingformGuideCriterionModal";


export default function GradingformGuideCriterionList({ gradingformGuideCriteria }: { gradingformGuideCriteria: CompleteGradingformGuideCriterion[] }) {
  const { data: g } = trpc.gradingformGuideCriteria.getGradingformGuideCriteria.useQuery(undefined, {
    initialData: { gradingformGuideCriteria },
    refetchOnMount: false,
  });

  if (g.gradingformGuideCriteria.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradingformGuideCriteria.map((gradingformGuideCriterion) => (
        <GradingformGuideCriterion gradingformGuideCriterion={gradingformGuideCriterion} key={gradingformGuideCriterion.id} />
      ))}
    </ul>
  );
}

const GradingformGuideCriterion = ({ gradingformGuideCriterion }: { gradingformGuideCriterion: CompleteGradingformGuideCriterion }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradingformGuideCriterion.definitionId}</div>
      </div>
      <GradingformGuideCriterionModal gradingformGuideCriterion={gradingformGuideCriterion} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No gradingform guide criteria
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new gradingform guide criterion.
      </p>
      <div className="mt-6">
        <GradingformGuideCriterionModal emptyState={true} />
      </div>
    </div>
  );
};

