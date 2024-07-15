"use client";
import { CompleteDigilib } from "@soco/digilib-db/schema/digilibs";
import { trpc } from "@/lib/trpc/client";
import DigilibModal from "./DigilibModal";


export default function DigilibList({ digilibs }: { digilibs: CompleteDigilib[] }) {
  const { data: d } = trpc.digilibs.getDigilibs.useQuery(undefined, {
    initialData: { digilibs },
    refetchOnMount: false,
  });

  if (d.digilibs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {d.digilibs.map((digilib) => (
        <Digilib digilib={digilib} key={digilib.id} />
      ))}
    </ul>
  );
}

const Digilib = ({ digilib }: { digilib: CompleteDigilib }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{digilib.name}</div>
      </div>
      <DigilibModal digilib={digilib} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No digilibs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new digilib.
      </p>
      <div className="mt-6">
        <DigilibModal emptyState={true} />
      </div>
    </div>
  );
};

