"use client";
import { CompleteCompetencyPlan } from "@soco/competency-db/schema/competencyPlans";
import { trpc } from "@/lib/trpc/client";
import CompetencyPlanModal from "./CompetencyPlanModal";


export default function CompetencyPlanList({ competencyPlans }: { competencyPlans: CompleteCompetencyPlan[] }) {
  const { data: c } = trpc.competencyPlans.getCompetencyPlans.useQuery(undefined, {
    initialData: { competencyPlans },
    refetchOnMount: false,
  });

  if (c.competencyPlans.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyPlans.map((competencyPlan) => (
        <CompetencyPlan competencyPlan={competencyPlan} key={competencyPlan.id} />
      ))}
    </ul>
  );
}

const CompetencyPlan = ({ competencyPlan }: { competencyPlan: CompleteCompetencyPlan }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyPlan.name}</div>
      </div>
      <CompetencyPlanModal competencyPlan={competencyPlan} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency plans
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency plan.
      </p>
      <div className="mt-6">
        <CompetencyPlanModal emptyState={true} />
      </div>
    </div>
  );
};

