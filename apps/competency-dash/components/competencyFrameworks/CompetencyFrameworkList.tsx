"use client";
import { CompleteCompetencyFramework } from "@/lib/db/schema/competencyFrameworks";
import { trpc } from "@/lib/trpc/client";
import CompetencyFrameworkModal from "./CompetencyFrameworkModal";


export default function CompetencyFrameworkList({ competencyFrameworks }: { competencyFrameworks: CompleteCompetencyFramework[] }) {
  const { data: c } = trpc.competencyFrameworks.getCompetencyFrameworks.useQuery(undefined, {
    initialData: { competencyFrameworks },
    refetchOnMount: false,
  });

  if (c.competencyFrameworks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyFrameworks.map((competencyFramework) => (
        <CompetencyFramework competencyFramework={competencyFramework} key={competencyFramework.id} />
      ))}
    </ul>
  );
}

const CompetencyFramework = ({ competencyFramework }: { competencyFramework: CompleteCompetencyFramework }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyFramework.visible}</div>
      </div>
      <CompetencyFrameworkModal competencyFramework={competencyFramework} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency frameworks
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency framework.
      </p>
      <div className="mt-6">
        <CompetencyFrameworkModal emptyState={true} />
      </div>
    </div>
  );
};

