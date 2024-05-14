"use client";
import { CompleteCompetencyUserEvidenceComp } from "@/lib/db/schema/competencyUserEvidenceComps";
import { trpc } from "@/lib/trpc/client";
import CompetencyUserEvidenceCompModal from "./CompetencyUserEvidenceCompModal";


export default function CompetencyUserEvidenceCompList({ competencyUserEvidenceComps }: { competencyUserEvidenceComps: CompleteCompetencyUserEvidenceComp[] }) {
  const { data: c } = trpc.competencyUserEvidenceComps.getCompetencyUserEvidenceComps.useQuery(undefined, {
    initialData: { competencyUserEvidenceComps },
    refetchOnMount: false,
  });

  if (c.competencyUserEvidenceComps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyUserEvidenceComps.map((competencyUserEvidenceComp) => (
        <CompetencyUserEvidenceComp competencyUserEvidenceComp={competencyUserEvidenceComp} key={competencyUserEvidenceComp.competencyUserEvidenceComp.id} />
      ))}
    </ul>
  );
}

const CompetencyUserEvidenceComp = ({ competencyUserEvidenceComp }: { competencyUserEvidenceComp: CompleteCompetencyUserEvidenceComp }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyUserEvidenceComp.competencyUserEvidenceComp.competencyId}</div>
      </div>
      <CompetencyUserEvidenceCompModal competencyUserEvidenceComp={competencyUserEvidenceComp.competencyUserEvidenceComp} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency user evidence comps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency user evidence comp.
      </p>
      <div className="mt-6">
        <CompetencyUserEvidenceCompModal emptyState={true} />
      </div>
    </div>
  );
};

