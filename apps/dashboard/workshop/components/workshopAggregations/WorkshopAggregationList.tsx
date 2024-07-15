"use client";
import { CompleteWorkshopAggregation } from "@soco/workshop-db/schema/workshopAggregations";
import { trpc } from "@/lib/trpc/client";
import WorkshopAggregationModal from "./WorkshopAggregationModal";


export default function WorkshopAggregationList({ workshopAggregations }: { workshopAggregations: CompleteWorkshopAggregation[] }) {
  const { data: w } = trpc.workshopAggregations.getWorkshopAggregations.useQuery(undefined, {
    initialData: { workshopAggregations },
    refetchOnMount: false,
  });

  if (w.workshopAggregations.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshopAggregations.map((workshopAggregation) => (
        <WorkshopAggregation workshopAggregation={workshopAggregation} key={workshopAggregation.workshopAggregation.id} />
      ))}
    </ul>
  );
}

const WorkshopAggregation = ({ workshopAggregation }: { workshopAggregation: CompleteWorkshopAggregation }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshopAggregation.workshopAggregation.gradingGrade}</div>
      </div>
      <WorkshopAggregationModal workshopAggregation={workshopAggregation.workshopAggregation} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshop aggregations
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop aggregation.
      </p>
      <div className="mt-6">
        <WorkshopAggregationModal emptyState={true} />
      </div>
    </div>
  );
};

