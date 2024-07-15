"use client";
import { CompleteCompetencyCourseComp } from "@soco/competency-db/schema/competencyCourseComps";
import { trpc } from "@/lib/trpc/client";
import CompetencyCourseCompModal from "./CompetencyCourseCompModal";


export default function CompetencyCourseCompList({ competencyCourseComps }: { competencyCourseComps: CompleteCompetencyCourseComp[] }) {
  const { data: c } = trpc.competencyCourseComps.getCompetencyCourseComps.useQuery(undefined, {
    initialData: { competencyCourseComps },
    refetchOnMount: false,
  });

  if (c.competencyCourseComps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyCourseComps.map((competencyCourseComp) => (
        <CompetencyCourseComp competencyCourseComp={competencyCourseComp} key={competencyCourseComp.competencyCourseComp.id} />
      ))}
    </ul>
  );
}

const CompetencyCourseComp = ({ competencyCourseComp }: { competencyCourseComp: CompleteCompetencyCourseComp }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyCourseComp.competencyCourseComp.competencyId}</div>
      </div>
      <CompetencyCourseCompModal competencyCourseComp={competencyCourseComp.competencyCourseComp} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency course comps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency course comp.
      </p>
      <div className="mt-6">
        <CompetencyCourseCompModal emptyState={true} />
      </div>
    </div>
  );
};

