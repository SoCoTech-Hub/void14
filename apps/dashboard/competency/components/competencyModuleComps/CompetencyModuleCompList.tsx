"use client";
import { CompleteCompetencyModuleComp } from "@soco/competency-db/schema/competencyModuleComps";
import { trpc } from "@/lib/trpc/client";
import CompetencyModuleCompModal from "./CompetencyModuleCompModal";


export default function CompetencyModuleCompList({ competencyModuleComps }: { competencyModuleComps: CompleteCompetencyModuleComp[] }) {
  const { data: c } = trpc.competencyModuleComps.getCompetencyModuleComps.useQuery(undefined, {
    initialData: { competencyModuleComps },
    refetchOnMount: false,
  });

  if (c.competencyModuleComps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyModuleComps.map((competencyModuleComp) => (
        <CompetencyModuleComp competencyModuleComp={competencyModuleComp} key={competencyModuleComp.competencyModuleComp.id} />
      ))}
    </ul>
  );
}

const CompetencyModuleComp = ({ competencyModuleComp }: { competencyModuleComp: CompleteCompetencyModuleComp }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyModuleComp.competencyModuleComp.cmId}</div>
      </div>
      <CompetencyModuleCompModal competencyModuleComp={competencyModuleComp.competencyModuleComp} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency module comps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency module comp.
      </p>
      <div className="mt-6">
        <CompetencyModuleCompModal emptyState={true} />
      </div>
    </div>
  );
};

