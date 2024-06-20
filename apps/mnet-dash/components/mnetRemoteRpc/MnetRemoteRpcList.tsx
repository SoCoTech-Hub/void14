"use client";
import { CompleteMnetRemoteRpc } from "@/lib/db/schema/mnetRemoteRpc";
import { trpc } from "@/lib/trpc/client";
import MnetRemoteRpcModal from "./MnetRemoteRpcModal";


export default function MnetRemoteRpcList({ mnetRemoteRpc }: { mnetRemoteRpc: CompleteMnetRemoteRpc[] }) {
  const { data: m } = trpc.mnetRemoteRpc.getMnetRemoteRpc.useQuery(undefined, {
    initialData: { mnetRemoteRpc },
    refetchOnMount: false,
  });

  if (m.mnetRemoteRpc.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.mnetRemoteRpc.map((mnetRemoteRpc) => (
        <MnetRemoteRpc mnetRemoteRpc={mnetRemoteRpc} key={mnetRemoteRpc.id} />
      ))}
    </ul>
  );
}

const MnetRemoteRpc = ({ mnetRemoteRpc }: { mnetRemoteRpc: CompleteMnetRemoteRpc }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{mnetRemoteRpc.enabled}</div>
      </div>
      <MnetRemoteRpcModal mnetRemoteRpc={mnetRemoteRpc} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mnet remote rpc
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mnet remote rpc.
      </p>
      <div className="mt-6">
        <MnetRemoteRpcModal emptyState={true} />
      </div>
    </div>
  );
};

