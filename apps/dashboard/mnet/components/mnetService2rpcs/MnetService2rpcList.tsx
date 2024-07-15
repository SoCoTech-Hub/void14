"use client";
import { CompleteMnetService2rpc } from "@soco/mnet-db/schema/mnetService2rpcs";
import { trpc } from "@/lib/trpc/client";
import MnetService2rpcModal from "./MnetService2rpcModal";


export default function MnetService2rpcList({ mnetService2rpcs }: { mnetService2rpcs: CompleteMnetService2rpc[] }) {
  const { data: m } = trpc.mnetService2rpcs.getMnetService2rpcs.useQuery(undefined, {
    initialData: { mnetService2rpcs },
    refetchOnMount: false,
  });

  if (m.mnetService2rpcs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.mnetService2rpcs.map((mnetService2rpc) => (
        <MnetService2rpc mnetService2rpc={mnetService2rpc} key={mnetService2rpc.mnetService2rpc.id} />
      ))}
    </ul>
  );
}

const MnetService2rpc = ({ mnetService2rpc }: { mnetService2rpc: CompleteMnetService2rpc }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{mnetService2rpc.mnetService2rpc.mnetServiceId}</div>
      </div>
      <MnetService2rpcModal mnetService2rpc={mnetService2rpc.mnetService2rpc} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mnet service2rpcs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mnet service2rpc.
      </p>
      <div className="mt-6">
        <MnetService2rpcModal emptyState={true} />
      </div>
    </div>
  );
};

