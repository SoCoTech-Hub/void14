"use client";
import { CompleteSupportStatus } from "@/lib/db/schema/supportStatuses";
import { trpc } from "@/lib/trpc/client";
import SupportStatusModal from "./SupportStatusModal";


export default function SupportStatusList({ supportStatuses }: { supportStatuses: CompleteSupportStatus[] }) {
  const { data: s } = trpc.supportStatuses.getSupportStatuses.useQuery(undefined, {
    initialData: { supportStatuses },
    refetchOnMount: false,
  });

  if (s.supportStatuses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.supportStatuses.map((supportStatus) => (
        <SupportStatus supportStatus={supportStatus} key={supportStatus.id} />
      ))}
    </ul>
  );
}

const SupportStatus = ({ supportStatus }: { supportStatus: CompleteSupportStatus }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{supportStatus.name}</div>
      </div>
      <SupportStatusModal supportStatus={supportStatus} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No support statuses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new support status.
      </p>
      <div className="mt-6">
        <SupportStatusModal emptyState={true} />
      </div>
    </div>
  );
};

