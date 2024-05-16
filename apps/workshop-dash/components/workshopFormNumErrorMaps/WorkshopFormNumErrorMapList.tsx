"use client";
import { CompleteWorkshopFormNumErrorMap } from "@/lib/db/schema/workshopFormNumErrorMaps";
import { trpc } from "@/lib/trpc/client";
import WorkshopFormNumErrorMapModal from "./WorkshopFormNumErrorMapModal";


export default function WorkshopFormNumErrorMapList({ workshopFormNumErrorMaps }: { workshopFormNumErrorMaps: CompleteWorkshopFormNumErrorMap[] }) {
  const { data: w } = trpc.workshopFormNumErrorMaps.getWorkshopFormNumErrorMaps.useQuery(undefined, {
    initialData: { workshopFormNumErrorMaps },
    refetchOnMount: false,
  });

  if (w.workshopFormNumErrorMaps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshopFormNumErrorMaps.map((workshopFormNumErrorMap) => (
        <WorkshopFormNumErrorMap workshopFormNumErrorMap={workshopFormNumErrorMap} key={workshopFormNumErrorMap.workshopFormNumErrorMap.id} />
      ))}
    </ul>
  );
}

const WorkshopFormNumErrorMap = ({ workshopFormNumErrorMap }: { workshopFormNumErrorMap: CompleteWorkshopFormNumErrorMap }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshopFormNumErrorMap.workshopFormNumErrorMap.grade}</div>
      </div>
      <WorkshopFormNumErrorMapModal workshopFormNumErrorMap={workshopFormNumErrorMap.workshopFormNumErrorMap} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshop form num error maps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop form num error map.
      </p>
      <div className="mt-6">
        <WorkshopFormNumErrorMapModal emptyState={true} />
      </div>
    </div>
  );
};

