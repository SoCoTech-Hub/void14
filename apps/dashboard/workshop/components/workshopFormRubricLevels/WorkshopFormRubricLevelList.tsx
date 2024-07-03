"use client";
import { CompleteWorkshopFormRubricLevel } from "@/lib/db/schema/workshopFormRubricLevels";
import { trpc } from "@/lib/trpc/client";
import WorkshopFormRubricLevelModal from "./WorkshopFormRubricLevelModal";


export default function WorkshopFormRubricLevelList({ workshopFormRubricLevels }: { workshopFormRubricLevels: CompleteWorkshopFormRubricLevel[] }) {
  const { data: w } = trpc.workshopFormRubricLevels.getWorkshopFormRubricLevels.useQuery(undefined, {
    initialData: { workshopFormRubricLevels },
    refetchOnMount: false,
  });

  if (w.workshopFormRubricLevels.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshopFormRubricLevels.map((workshopFormRubricLevel) => (
        <WorkshopFormRubricLevel workshopFormRubricLevel={workshopFormRubricLevel} key={workshopFormRubricLevel.id} />
      ))}
    </ul>
  );
}

const WorkshopFormRubricLevel = ({ workshopFormRubricLevel }: { workshopFormRubricLevel: CompleteWorkshopFormRubricLevel }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshopFormRubricLevel.definition}</div>
      </div>
      <WorkshopFormRubricLevelModal workshopFormRubricLevel={workshopFormRubricLevel} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshop form rubric levels
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop form rubric level.
      </p>
      <div className="mt-6">
        <WorkshopFormRubricLevelModal emptyState={true} />
      </div>
    </div>
  );
};

