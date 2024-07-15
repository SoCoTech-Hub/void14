"use client";
import { CompleteGradingformRubricLevel } from "@soco/grade-db/schema/gradingformRubricLevels";
import { trpc } from "@/lib/trpc/client";
import GradingformRubricLevelModal from "./GradingformRubricLevelModal";


export default function GradingformRubricLevelList({ gradingformRubricLevels }: { gradingformRubricLevels: CompleteGradingformRubricLevel[] }) {
  const { data: g } = trpc.gradingformRubricLevels.getGradingformRubricLevels.useQuery(undefined, {
    initialData: { gradingformRubricLevels },
    refetchOnMount: false,
  });

  if (g.gradingformRubricLevels.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradingformRubricLevels.map((gradingformRubricLevel) => (
        <GradingformRubricLevel gradingformRubricLevel={gradingformRubricLevel} key={gradingformRubricLevel.id} />
      ))}
    </ul>
  );
}

const GradingformRubricLevel = ({ gradingformRubricLevel }: { gradingformRubricLevel: CompleteGradingformRubricLevel }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradingformRubricLevel.criterionId}</div>
      </div>
      <GradingformRubricLevelModal gradingformRubricLevel={gradingformRubricLevel} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No gradingform rubric levels
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new gradingform rubric level.
      </p>
      <div className="mt-6">
        <GradingformRubricLevelModal emptyState={true} />
      </div>
    </div>
  );
};

