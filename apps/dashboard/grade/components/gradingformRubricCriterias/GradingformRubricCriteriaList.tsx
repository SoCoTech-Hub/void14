"use client";
import { CompleteGradingformRubricCriteria } from "@soco/grade-db/schema/gradingformRubricCriterias";
import { trpc } from "@/lib/trpc/client";
import GradingformRubricCriteriaModal from "./GradingformRubricCriteriaModal";


export default function GradingformRubricCriteriaList({ gradingformRubricCriterias }: { gradingformRubricCriterias: CompleteGradingformRubricCriteria[] }) {
  const { data: g } = trpc.gradingformRubricCriterias.getGradingformRubricCriterias.useQuery(undefined, {
    initialData: { gradingformRubricCriterias },
    refetchOnMount: false,
  });

  if (g.gradingformRubricCriterias.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradingformRubricCriterias.map((gradingformRubricCriteria) => (
        <GradingformRubricCriteria gradingformRubricCriteria={gradingformRubricCriteria} key={gradingformRubricCriteria.id} />
      ))}
    </ul>
  );
}

const GradingformRubricCriteria = ({ gradingformRubricCriteria }: { gradingformRubricCriteria: CompleteGradingformRubricCriteria }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradingformRubricCriteria.definitionId}</div>
      </div>
      <GradingformRubricCriteriaModal gradingformRubricCriteria={gradingformRubricCriteria} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No gradingform rubric criterias
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new gradingform rubric criteria.
      </p>
      <div className="mt-6">
        <GradingformRubricCriteriaModal emptyState={true} />
      </div>
    </div>
  );
};

