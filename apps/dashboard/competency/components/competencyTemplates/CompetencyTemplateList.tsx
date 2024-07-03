"use client";
import { CompleteCompetencyTemplate } from "@/lib/db/schema/competencyTemplates";
import { trpc } from "@/lib/trpc/client";
import CompetencyTemplateModal from "./CompetencyTemplateModal";


export default function CompetencyTemplateList({ competencyTemplates }: { competencyTemplates: CompleteCompetencyTemplate[] }) {
  const { data: c } = trpc.competencyTemplates.getCompetencyTemplates.useQuery(undefined, {
    initialData: { competencyTemplates },
    refetchOnMount: false,
  });

  if (c.competencyTemplates.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyTemplates.map((competencyTemplate) => (
        <CompetencyTemplate competencyTemplate={competencyTemplate} key={competencyTemplate.id} />
      ))}
    </ul>
  );
}

const CompetencyTemplate = ({ competencyTemplate }: { competencyTemplate: CompleteCompetencyTemplate }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyTemplate.visible}</div>
      </div>
      <CompetencyTemplateModal competencyTemplate={competencyTemplate} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency templates
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency template.
      </p>
      <div className="mt-6">
        <CompetencyTemplateModal emptyState={true} />
      </div>
    </div>
  );
};

