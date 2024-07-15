"use client";
import { CompleteCompetencyPlanComp } from "@soco/competency-db/schema/competencyPlanComps";
import { trpc } from "@/lib/trpc/client";
import CompetencyPlanCompModal from "./CompetencyPlanCompModal";


export default function CompetencyPlanCompList({ competencyPlanComps }: { competencyPlanComps: CompleteCompetencyPlanComp[] }) {
  const { data: c } = trpc.competencyPlanComps.getCompetencyPlanComps.useQuery(undefined, {
    initialData: { competencyPlanComps },
    refetchOnMount: false,
  });

  if (c.competencyPlanComps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyPlanComps.map((competencyPlanComp) => (
        <CompetencyPlanComp competencyPlanComp={competencyPlanComp} key={competencyPlanComp.competencyPlanComp.id} />
      ))}
    </ul>
  );
}

const CompetencyPlanComp = ({ competencyPlanComp }: { competencyPlanComp: CompleteCompetencyPlanComp }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyPlanComp.competencyPlanComp.competencyId}</div>
      </div>
      <CompetencyPlanCompModal competencyPlanComp={competencyPlanComp.competencyPlanComp} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency plan comps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency plan comp.
      </p>
      <div className="mt-6">
        <CompetencyPlanCompModal emptyState={true} />
      </div>
    </div>
  );
};

