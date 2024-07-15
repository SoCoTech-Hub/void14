"use client";
import { CompleteCompetencyTemplateCohort } from "@soco/competency-db/schema/competencyTemplateCohorts";
import { trpc } from "@/lib/trpc/client";
import CompetencyTemplateCohortModal from "./CompetencyTemplateCohortModal";


export default function CompetencyTemplateCohortList({ competencyTemplateCohorts }: { competencyTemplateCohorts: CompleteCompetencyTemplateCohort[] }) {
  const { data: c } = trpc.competencyTemplateCohorts.getCompetencyTemplateCohorts.useQuery(undefined, {
    initialData: { competencyTemplateCohorts },
    refetchOnMount: false,
  });

  if (c.competencyTemplateCohorts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyTemplateCohorts.map((competencyTemplateCohort) => (
        <CompetencyTemplateCohort competencyTemplateCohort={competencyTemplateCohort} key={competencyTemplateCohort.competencyTemplateCohort.id} />
      ))}
    </ul>
  );
}

const CompetencyTemplateCohort = ({ competencyTemplateCohort }: { competencyTemplateCohort: CompleteCompetencyTemplateCohort }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyTemplateCohort.competencyTemplateCohort.competencyTemplateId}</div>
      </div>
      <CompetencyTemplateCohortModal competencyTemplateCohort={competencyTemplateCohort.competencyTemplateCohort} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency template cohorts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency template cohort.
      </p>
      <div className="mt-6">
        <CompetencyTemplateCohortModal emptyState={true} />
      </div>
    </div>
  );
};

