"use client";
import { CompleteH5p } from "@/lib/db/schema/h5ps";
import { trpc } from "@/lib/trpc/client";
import H5pModal from "./H5pModal";


export default function H5pList({ h5ps }: { h5ps: CompleteH5p[] }) {
  const { data: h } = trpc.h5ps.getH5ps.useQuery(undefined, {
    initialData: { h5ps },
    refetchOnMount: false,
  });

  if (h.h5ps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {h.h5ps.map((h5p) => (
        <H5p h5p={h5p} key={h5p.id} />
      ))}
    </ul>
  );
}

const H5p = ({ h5p }: { h5p: CompleteH5p }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{h5p.contentHash}</div>
      </div>
      <H5pModal h5p={h5p} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No h5ps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new h5p.
      </p>
      <div className="mt-6">
        <H5pModal emptyState={true} />
      </div>
    </div>
  );
};

