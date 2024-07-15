"use client";
import { CompleteMnetService } from "@soco/mnet-db/schema/mnetServices";
import { trpc } from "@/lib/trpc/client";
import MnetServiceModal from "./MnetServiceModal";


export default function MnetServiceList({ mnetServices }: { mnetServices: CompleteMnetService[] }) {
  const { data: m } = trpc.mnetServices.getMnetServices.useQuery(undefined, {
    initialData: { mnetServices },
    refetchOnMount: false,
  });

  if (m.mnetServices.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.mnetServices.map((mnetService) => (
        <MnetService mnetService={mnetService} key={mnetService.id} />
      ))}
    </ul>
  );
}

const MnetService = ({ mnetService }: { mnetService: CompleteMnetService }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{mnetService.apiVersion}</div>
      </div>
      <MnetServiceModal mnetService={mnetService} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mnet services
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mnet service.
      </p>
      <div className="mt-6">
        <MnetServiceModal emptyState={true} />
      </div>
    </div>
  );
};

