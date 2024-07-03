"use client";
import { CompleteCompetencyTemplateComp } from "@/lib/db/schema/competencyTemplateComps";
import { trpc } from "@/lib/trpc/client";
import CompetencyTemplateCompModal from "./CompetencyTemplateCompModal";


export default function CompetencyTemplateCompList({ competencyTemplateComps }: { competencyTemplateComps: CompleteCompetencyTemplateComp[] }) {
  const { data: c } = trpc.competencyTemplateComps.getCompetencyTemplateComps.useQuery(undefined, {
    initialData: { competencyTemplateComps },
    refetchOnMount: false,
  });

  if (c.competencyTemplateComps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyTemplateComps.map((competencyTemplateComp) => (
        <CompetencyTemplateComp competencyTemplateComp={competencyTemplateComp} key={competencyTemplateComp.competencyTemplateComp.id} />
      ))}
    </ul>
  );
}

const CompetencyTemplateComp = ({ competencyTemplateComp }: { competencyTemplateComp: CompleteCompetencyTemplateComp }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyTemplateComp.competencyTemplateComp.competencyId}</div>
      </div>
      <CompetencyTemplateCompModal competencyTemplateComp={competencyTemplateComp.competencyTemplateComp} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency template comps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency template comp.
      </p>
      <div className="mt-6">
        <CompetencyTemplateCompModal emptyState={true} />
      </div>
    </div>
  );
};

