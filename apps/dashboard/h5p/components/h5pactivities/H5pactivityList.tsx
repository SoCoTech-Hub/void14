"use client";
import { CompleteH5pactivity } from "@soco/h5p-db/schema/h5pactivities";
import { trpc } from "@/lib/trpc/client";
import H5pactivityModal from "./H5pactivityModal";


export default function H5pactivityList({ h5pactivities }: { h5pactivities: CompleteH5pactivity[] }) {
  const { data: h } = trpc.h5pactivities.getH5pactivities.useQuery(undefined, {
    initialData: { h5pactivities },
    refetchOnMount: false,
  });

  if (h.h5pactivities.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {h.h5pactivities.map((h5pactivity) => (
        <H5pactivity h5pactivity={h5pactivity} key={h5pactivity.id} />
      ))}
    </ul>
  );
}

const H5pactivity = ({ h5pactivity }: { h5pactivity: CompleteH5pactivity }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{h5pactivity.course}</div>
      </div>
      <H5pactivityModal h5pactivity={h5pactivity} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No h5pactivities
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new h5pactivity.
      </p>
      <div className="mt-6">
        <H5pactivityModal emptyState={true} />
      </div>
    </div>
  );
};

