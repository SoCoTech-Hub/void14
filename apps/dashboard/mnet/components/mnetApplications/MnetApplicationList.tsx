"use client";
import { CompleteMnetApplication } from "@/lib/db/schema/mnetApplications";
import { trpc } from "@/lib/trpc/client";
import MnetApplicationModal from "./MnetApplicationModal";


export default function MnetApplicationList({ mnetApplications }: { mnetApplications: CompleteMnetApplication[] }) {
  const { data: m } = trpc.mnetApplications.getMnetApplications.useQuery(undefined, {
    initialData: { mnetApplications },
    refetchOnMount: false,
  });

  if (m.mnetApplications.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.mnetApplications.map((mnetApplication) => (
        <MnetApplication mnetApplication={mnetApplication} key={mnetApplication.id} />
      ))}
    </ul>
  );
}

const MnetApplication = ({ mnetApplication }: { mnetApplication: CompleteMnetApplication }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{mnetApplication.displayName}</div>
      </div>
      <MnetApplicationModal mnetApplication={mnetApplication} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mnet applications
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mnet application.
      </p>
      <div className="mt-6">
        <MnetApplicationModal emptyState={true} />
      </div>
    </div>
  );
};

