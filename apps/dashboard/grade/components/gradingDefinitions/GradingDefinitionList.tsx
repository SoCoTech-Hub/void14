"use client";
import { CompleteGradingDefinition } from "@soco/grade-db/schema/gradingDefinitions";
import { trpc } from "@/lib/trpc/client";
import GradingDefinitionModal from "./GradingDefinitionModal";


export default function GradingDefinitionList({ gradingDefinitions }: { gradingDefinitions: CompleteGradingDefinition[] }) {
  const { data: g } = trpc.gradingDefinitions.getGradingDefinitions.useQuery(undefined, {
    initialData: { gradingDefinitions },
    refetchOnMount: false,
  });

  if (g.gradingDefinitions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradingDefinitions.map((gradingDefinition) => (
        <GradingDefinition gradingDefinition={gradingDefinition} key={gradingDefinition.id} />
      ))}
    </ul>
  );
}

const GradingDefinition = ({ gradingDefinition }: { gradingDefinition: CompleteGradingDefinition }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradingDefinition.areaId}</div>
      </div>
      <GradingDefinitionModal gradingDefinition={gradingDefinition} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grading definitions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grading definition.
      </p>
      <div className="mt-6">
        <GradingDefinitionModal emptyState={true} />
      </div>
    </div>
  );
};

