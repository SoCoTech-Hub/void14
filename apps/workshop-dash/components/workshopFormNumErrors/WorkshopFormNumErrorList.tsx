"use client";
import { CompleteWorkshopFormNumError } from "@/lib/db/schema/workshopFormNumErrors";
import { trpc } from "@/lib/trpc/client";
import WorkshopFormNumErrorModal from "./WorkshopFormNumErrorModal";


export default function WorkshopFormNumErrorList({ workshopFormNumErrors }: { workshopFormNumErrors: CompleteWorkshopFormNumError[] }) {
  const { data: w } = trpc.workshopFormNumErrors.getWorkshopFormNumErrors.useQuery(undefined, {
    initialData: { workshopFormNumErrors },
    refetchOnMount: false,
  });

  if (w.workshopFormNumErrors.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshopFormNumErrors.map((workshopFormNumError) => (
        <WorkshopFormNumError workshopFormNumError={workshopFormNumError} key={workshopFormNumError.workshopFormNumError.id} />
      ))}
    </ul>
  );
}

const WorkshopFormNumError = ({ workshopFormNumError }: { workshopFormNumError: CompleteWorkshopFormNumError }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshopFormNumError.workshopFormNumError.description}</div>
      </div>
      <WorkshopFormNumErrorModal workshopFormNumError={workshopFormNumError.workshopFormNumError} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshop form num errors
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop form num error.
      </p>
      <div className="mt-6">
        <WorkshopFormNumErrorModal emptyState={true} />
      </div>
    </div>
  );
};

