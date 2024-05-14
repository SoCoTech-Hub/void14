"use client";
import { CompleteCompetency } from "@/lib/db/schema/competencies";
import { trpc } from "@/lib/trpc/client";
import CompetencyModal from "./CompetencyModal";


export default function CompetencyList({ competencies }: { competencies: CompleteCompetency[] }) {
  const { data: c } = trpc.competencies.getCompetencies.useQuery(undefined, {
    initialData: { competencies },
    refetchOnMount: false,
  });

  if (c.competencies.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencies.map((competency) => (
        <Competency competency={competency} key={competency.competency.id} />
      ))}
    </ul>
  );
}

const Competency = ({ competency }: { competency: CompleteCompetency }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competency.competency.competencyFrameworkId}</div>
      </div>
      <CompetencyModal competency={competency.competency} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competencies
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency.
      </p>
      <div className="mt-6">
        <CompetencyModal emptyState={true} />
      </div>
    </div>
  );
};

