"use client";
import { CompleteWorkshopFormRubric } from "@soco/workshop-db/schema/workshopFormRubrics";
import { trpc } from "@/lib/trpc/client";
import WorkshopFormRubricModal from "./WorkshopFormRubricModal";


export default function WorkshopFormRubricList({ workshopFormRubrics }: { workshopFormRubrics: CompleteWorkshopFormRubric[] }) {
  const { data: w } = trpc.workshopFormRubrics.getWorkshopFormRubrics.useQuery(undefined, {
    initialData: { workshopFormRubrics },
    refetchOnMount: false,
  });

  if (w.workshopFormRubrics.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshopFormRubrics.map((workshopFormRubric) => (
        <WorkshopFormRubric workshopFormRubric={workshopFormRubric} key={workshopFormRubric.workshopFormRubric.id} />
      ))}
    </ul>
  );
}

const WorkshopFormRubric = ({ workshopFormRubric }: { workshopFormRubric: CompleteWorkshopFormRubric }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshopFormRubric.workshopFormRubric.description}</div>
      </div>
      <WorkshopFormRubricModal workshopFormRubric={workshopFormRubric.workshopFormRubric} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshop form rubrics
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop form rubric.
      </p>
      <div className="mt-6">
        <WorkshopFormRubricModal emptyState={true} />
      </div>
    </div>
  );
};

