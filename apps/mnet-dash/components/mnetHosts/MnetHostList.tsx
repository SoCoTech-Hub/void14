"use client";
import { CompleteMnetHost } from "@/lib/db/schema/mnetHosts";
import { trpc } from "@/lib/trpc/client";
import MnetHostModal from "./MnetHostModal";


export default function MnetHostList({ mnetHosts }: { mnetHosts: CompleteMnetHost[] }) {
  const { data: m } = trpc.mnetHosts.getMnetHosts.useQuery(undefined, {
    initialData: { mnetHosts },
    refetchOnMount: false,
  });

  if (m.mnetHosts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.mnetHosts.map((mnetHost) => (
        <MnetHost mnetHost={mnetHost} key={mnetHost.id} />
      ))}
    </ul>
  );
}

const MnetHost = ({ mnetHost }: { mnetHost: CompleteMnetHost }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{mnetHost.applicationId}</div>
      </div>
      <MnetHostModal mnetHost={mnetHost} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mnet hosts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mnet host.
      </p>
      <div className="mt-6">
        <MnetHostModal emptyState={true} />
      </div>
    </div>
  );
};

