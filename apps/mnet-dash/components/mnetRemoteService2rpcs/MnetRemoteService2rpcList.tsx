"use client";
import { CompleteMnetRemoteService2rpc } from "@/lib/db/schema/mnetRemoteService2rpcs";
import { trpc } from "@/lib/trpc/client";
import MnetRemoteService2rpcModal from "./MnetRemoteService2rpcModal";


export default function MnetRemoteService2rpcList({ mnetRemoteService2rpcs }: { mnetRemoteService2rpcs: CompleteMnetRemoteService2rpc[] }) {
  const { data: m } = trpc.mnetRemoteService2rpcs.getMnetRemoteService2rpcs.useQuery(undefined, {
    initialData: { mnetRemoteService2rpcs },
    refetchOnMount: false,
  });

  if (m.mnetRemoteService2rpcs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.mnetRemoteService2rpcs.map((mnetRemoteService2rpc) => (
        <MnetRemoteService2rpc mnetRemoteService2rpc={mnetRemoteService2rpc} key={mnetRemoteService2rpc.id} />
      ))}
    </ul>
  );
}

const MnetRemoteService2rpc = ({ mnetRemoteService2rpc }: { mnetRemoteService2rpc: CompleteMnetRemoteService2rpc }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{mnetRemoteService2rpc.rpcId}</div>
      </div>
      <MnetRemoteService2rpcModal mnetRemoteService2rpc={mnetRemoteService2rpc} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mnet remote service2rpcs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mnet remote service2rpc.
      </p>
      <div className="mt-6">
        <MnetRemoteService2rpcModal emptyState={true} />
      </div>
    </div>
  );
};

