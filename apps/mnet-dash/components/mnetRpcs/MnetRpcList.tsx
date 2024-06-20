"use client";
import { CompleteMnetRpc } from "@/lib/db/schema/mnetRpcs";
import { trpc } from "@/lib/trpc/client";
import MnetRpcModal from "./MnetRpcModal";


export default function MnetRpcList({ mnetRpcs }: { mnetRpcs: CompleteMnetRpc[] }) {
  const { data: m } = trpc.mnetRpcs.getMnetRpcs.useQuery(undefined, {
    initialData: { mnetRpcs },
    refetchOnMount: false,
  });

  if (m.mnetRpcs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.mnetRpcs.map((mnetRpc) => (
        <MnetRpc mnetRpc={mnetRpc} key={mnetRpc.id} />
      ))}
    </ul>
  );
}

const MnetRpc = ({ mnetRpc }: { mnetRpc: CompleteMnetRpc }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{mnetRpc.classname}</div>
      </div>
      <MnetRpcModal mnetRpc={mnetRpc} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mnet rpcs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mnet rpc.
      </p>
      <div className="mt-6">
        <MnetRpcModal emptyState={true} />
      </div>
    </div>
  );
};

