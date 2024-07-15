"use client";
import { CompleteResourceOld } from "@soco/resource-db/schema/resourceOlds";
import { trpc } from "@/lib/trpc/client";
import ResourceOldModal from "./ResourceOldModal";


export default function ResourceOldList({ resourceOlds }: { resourceOlds: CompleteResourceOld[] }) {
  const { data: r } = trpc.resourceOlds.getResourceOlds.useQuery(undefined, {
    initialData: { resourceOlds },
    refetchOnMount: false,
  });

  if (r.resourceOlds.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.resourceOlds.map((resourceOld) => (
        <ResourceOld resourceOld={resourceOld} key={resourceOld.id} />
      ))}
    </ul>
  );
}

const ResourceOld = ({ resourceOld }: { resourceOld: CompleteResourceOld }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{resourceOld.allText}</div>
      </div>
      <ResourceOldModal resourceOld={resourceOld} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No resource olds
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new resource old.
      </p>
      <div className="mt-6">
        <ResourceOldModal emptyState={true} />
      </div>
    </div>
  );
};

