"use client";
import { CompleteGradeOutcome } from "@soco/grade-db/schema/gradeOutcomes";
import { trpc } from "@/lib/trpc/client";
import GradeOutcomeModal from "./GradeOutcomeModal";


export default function GradeOutcomeList({ gradeOutcomes }: { gradeOutcomes: CompleteGradeOutcome[] }) {
  const { data: g } = trpc.gradeOutcomes.getGradeOutcomes.useQuery(undefined, {
    initialData: { gradeOutcomes },
    refetchOnMount: false,
  });

  if (g.gradeOutcomes.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradeOutcomes.map((gradeOutcome) => (
        <GradeOutcome gradeOutcome={gradeOutcome} key={gradeOutcome.id} />
      ))}
    </ul>
  );
}

const GradeOutcome = ({ gradeOutcome }: { gradeOutcome: CompleteGradeOutcome }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradeOutcome.courseId}</div>
      </div>
      <GradeOutcomeModal gradeOutcome={gradeOutcome} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grade outcomes
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade outcome.
      </p>
      <div className="mt-6">
        <GradeOutcomeModal emptyState={true} />
      </div>
    </div>
  );
};

