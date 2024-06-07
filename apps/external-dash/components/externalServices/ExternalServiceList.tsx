"use client";
import { CompleteExternalService } from "@/lib/db/schema/externalServices";
import { trpc } from "@/lib/trpc/client";
import ExternalServiceModal from "./ExternalServiceModal";


export default function ExternalServiceList({ externalServices }: { externalServices: CompleteExternalService[] }) {
  const { data: e } = trpc.externalServices.getExternalServices.useQuery(undefined, {
    initialData: { externalServices },
    refetchOnMount: false,
  });

  if (e.externalServices.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.externalServices.map((externalService) => (
        <ExternalService externalService={externalService} key={externalService.id} />
      ))}
    </ul>
  );
}

const ExternalService = ({ externalService }: { externalService: CompleteExternalService }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{externalService.component}</div>
      </div>
      <ExternalServiceModal externalService={externalService} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No external services
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new external service.
      </p>
      <div className="mt-6">
        <ExternalServiceModal emptyState={true} />
      </div>
    </div>
  );
};

