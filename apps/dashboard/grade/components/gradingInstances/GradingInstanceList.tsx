"use client";
import { CompleteGradingInstance } from "@/lib/db/schema/gradingInstances";
import { trpc } from "@/lib/trpc/client";
import GradingInstanceModal from "./GradingInstanceModal";


export default function GradingInstanceList({ gradingInstances }: { gradingInstances: CompleteGradingInstance[] }) {
  const { data: g } = trpc.gradingInstances.getGradingInstances.useQuery(undefined, {
    initialData: { gradingInstances },
    refetchOnMount: false,
  });

  if (g.gradingInstances.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradingInstances.map((gradingInstance) => (
        <GradingInstance gradingInstance={gradingInstance} key={gradingInstance.id} />
      ))}
    </ul>
  );
}

const GradingInstance = ({ gradingInstance }: { gradingInstance: CompleteGradingInstance }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradingInstance.definitionId}</div>
      </div>
      <GradingInstanceModal gradingInstance={gradingInstance} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grading instances
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grading instance.
      </p>
      <div className="mt-6">
        <GradingInstanceModal emptyState={true} />
      </div>
    </div>
  );
};

