"use client";
import { CompleteMnetHost2service } from "@/lib/db/schema/mnetHost2services";
import { trpc } from "@/lib/trpc/client";
import MnetHost2serviceModal from "./MnetHost2serviceModal";


export default function MnetHost2serviceList({ mnetHost2services }: { mnetHost2services: CompleteMnetHost2service[] }) {
  const { data: m } = trpc.mnetHost2services.getMnetHost2services.useQuery(undefined, {
    initialData: { mnetHost2services },
    refetchOnMount: false,
  });

  if (m.mnetHost2services.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.mnetHost2services.map((mnetHost2service) => (
        <MnetHost2service mnetHost2service={mnetHost2service} key={mnetHost2service.mnetHost2service.id} />
      ))}
    </ul>
  );
}

const MnetHost2service = ({ mnetHost2service }: { mnetHost2service: CompleteMnetHost2service }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{mnetHost2service.mnetHost2service.mnetHostId}</div>
      </div>
      <MnetHost2serviceModal mnetHost2service={mnetHost2service.mnetHost2service} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mnet host2services
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mnet host2service.
      </p>
      <div className="mt-6">
        <MnetHost2serviceModal emptyState={true} />
      </div>
    </div>
  );
};

