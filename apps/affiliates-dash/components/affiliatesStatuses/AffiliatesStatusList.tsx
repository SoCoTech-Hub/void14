"use client";
import { CompleteAffiliatesStatus } from "@/lib/db/schema/affiliatesStatuses";
import { trpc } from "@/lib/trpc/client";
import AffiliatesStatusModal from "./AffiliatesStatusModal";


export default function AffiliatesStatusList({ affiliatesStatuses }: { affiliatesStatuses: CompleteAffiliatesStatus[] }) {
  const { data: a } = trpc.affiliatesStatuses.getAffiliatesStatuses.useQuery(undefined, {
    initialData: { affiliatesStatuses },
    refetchOnMount: false,
  });

  if (a.affiliatesStatuses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.affiliatesStatuses.map((affiliatesStatus) => (
        <AffiliatesStatus affiliatesStatus={affiliatesStatus} key={affiliatesStatus.id} />
      ))}
    </ul>
  );
}

const AffiliatesStatus = ({ affiliatesStatus }: { affiliatesStatus: CompleteAffiliatesStatus }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{affiliatesStatus.name}</div>
      </div>
      <AffiliatesStatusModal affiliatesStatus={affiliatesStatus} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No affiliates statuses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new affiliates status.
      </p>
      <div className="mt-6">
        <AffiliatesStatusModal emptyState={true} />
      </div>
    </div>
  );
};

