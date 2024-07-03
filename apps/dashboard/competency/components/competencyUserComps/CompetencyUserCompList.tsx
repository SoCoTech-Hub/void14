"use client";
import { CompleteCompetencyUserComp } from "@/lib/db/schema/competencyUserComps";
import { trpc } from "@/lib/trpc/client";
import CompetencyUserCompModal from "./CompetencyUserCompModal";


export default function CompetencyUserCompList({ competencyUserComps }: { competencyUserComps: CompleteCompetencyUserComp[] }) {
  const { data: c } = trpc.competencyUserComps.getCompetencyUserComps.useQuery(undefined, {
    initialData: { competencyUserComps },
    refetchOnMount: false,
  });

  if (c.competencyUserComps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyUserComps.map((competencyUserComp) => (
        <CompetencyUserComp competencyUserComp={competencyUserComp} key={competencyUserComp.competencyUserComp.id} />
      ))}
    </ul>
  );
}

const CompetencyUserComp = ({ competencyUserComp }: { competencyUserComp: CompleteCompetencyUserComp }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyUserComp.competencyUserComp.competencyId}</div>
      </div>
      <CompetencyUserCompModal competencyUserComp={competencyUserComp.competencyUserComp} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency user comps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency user comp.
      </p>
      <div className="mt-6">
        <CompetencyUserCompModal emptyState={true} />
      </div>
    </div>
  );
};

