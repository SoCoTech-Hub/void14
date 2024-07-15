"use client";
import { CompleteCompetencyUserCompPlan } from "@soco/competency-db/schema/competencyUserCompPlans";
import { trpc } from "@/lib/trpc/client";
import CompetencyUserCompPlanModal from "./CompetencyUserCompPlanModal";


export default function CompetencyUserCompPlanList({ competencyUserCompPlans }: { competencyUserCompPlans: CompleteCompetencyUserCompPlan[] }) {
  const { data: c } = trpc.competencyUserCompPlans.getCompetencyUserCompPlans.useQuery(undefined, {
    initialData: { competencyUserCompPlans },
    refetchOnMount: false,
  });

  if (c.competencyUserCompPlans.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyUserCompPlans.map((competencyUserCompPlan) => (
        <CompetencyUserCompPlan competencyUserCompPlan={competencyUserCompPlan} key={competencyUserCompPlan.competencyUserCompPlan.id} />
      ))}
    </ul>
  );
}

const CompetencyUserCompPlan = ({ competencyUserCompPlan }: { competencyUserCompPlan: CompleteCompetencyUserCompPlan }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyUserCompPlan.competencyUserCompPlan.competencyId}</div>
      </div>
      <CompetencyUserCompPlanModal competencyUserCompPlan={competencyUserCompPlan.competencyUserCompPlan} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency user comp plans
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency user comp plan.
      </p>
      <div className="mt-6">
        <CompetencyUserCompPlanModal emptyState={true} />
      </div>
    </div>
  );
};

