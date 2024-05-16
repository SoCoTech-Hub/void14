"use client";
import { CompleteWorkshopFormAccumulative } from "@/lib/db/schema/workshopFormAccumulatives";
import { trpc } from "@/lib/trpc/client";
import WorkshopFormAccumulativeModal from "./WorkshopFormAccumulativeModal";


export default function WorkshopFormAccumulativeList({ workshopFormAccumulatives }: { workshopFormAccumulatives: CompleteWorkshopFormAccumulative[] }) {
  const { data: w } = trpc.workshopFormAccumulatives.getWorkshopFormAccumulatives.useQuery(undefined, {
    initialData: { workshopFormAccumulatives },
    refetchOnMount: false,
  });

  if (w.workshopFormAccumulatives.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshopFormAccumulatives.map((workshopFormAccumulative) => (
        <WorkshopFormAccumulative workshopFormAccumulative={workshopFormAccumulative} key={workshopFormAccumulative.workshopFormAccumulative.id} />
      ))}
    </ul>
  );
}

const WorkshopFormAccumulative = ({ workshopFormAccumulative }: { workshopFormAccumulative: CompleteWorkshopFormAccumulative }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshopFormAccumulative.workshopFormAccumulative.description}</div>
      </div>
      <WorkshopFormAccumulativeModal workshopFormAccumulative={workshopFormAccumulative.workshopFormAccumulative} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshop form accumulatives
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop form accumulative.
      </p>
      <div className="mt-6">
        <WorkshopFormAccumulativeModal emptyState={true} />
      </div>
    </div>
  );
};

