"use client";
import { CompleteCompetencyRelatedComp } from "@soco/competency-db/schema/competencyRelatedComps";
import { trpc } from "@/lib/trpc/client";
import CompetencyRelatedCompModal from "./CompetencyRelatedCompModal";


export default function CompetencyRelatedCompList({ competencyRelatedComps }: { competencyRelatedComps: CompleteCompetencyRelatedComp[] }) {
  const { data: c } = trpc.competencyRelatedComps.getCompetencyRelatedComps.useQuery(undefined, {
    initialData: { competencyRelatedComps },
    refetchOnMount: false,
  });

  if (c.competencyRelatedComps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyRelatedComps.map((competencyRelatedComp) => (
        <CompetencyRelatedComp competencyRelatedComp={competencyRelatedComp} key={competencyRelatedComp.competencyRelatedComp.id} />
      ))}
    </ul>
  );
}

const CompetencyRelatedComp = ({ competencyRelatedComp }: { competencyRelatedComp: CompleteCompetencyRelatedComp }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyRelatedComp.competencyRelatedComp.competencyId}</div>
      </div>
      <CompetencyRelatedCompModal competencyRelatedComp={competencyRelatedComp.competencyRelatedComp} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency related comps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency related comp.
      </p>
      <div className="mt-6">
        <CompetencyRelatedCompModal emptyState={true} />
      </div>
    </div>
  );
};

