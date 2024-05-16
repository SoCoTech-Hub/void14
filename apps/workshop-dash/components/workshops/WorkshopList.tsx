"use client";
import { CompleteWorkshop } from "@/lib/db/schema/workshops";
import { trpc } from "@/lib/trpc/client";
import WorkshopModal from "./WorkshopModal";


export default function WorkshopList({ workshops }: { workshops: CompleteWorkshop[] }) {
  const { data: w } = trpc.workshops.getWorkshops.useQuery(undefined, {
    initialData: { workshops },
    refetchOnMount: false,
  });

  if (w.workshops.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshops.map((workshop) => (
        <Workshop workshop={workshop} key={workshop.id} />
      ))}
    </ul>
  );
}

const Workshop = ({ workshop }: { workshop: CompleteWorkshop }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshop.assessmentStart}</div>
      </div>
      <WorkshopModal workshop={workshop} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshops
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop.
      </p>
      <div className="mt-6">
        <WorkshopModal emptyState={true} />
      </div>
    </div>
  );
};

