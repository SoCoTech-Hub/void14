"use client";
import { CompleteShow } from "@/lib/db/schema/shows";
import { trpc } from "@/lib/trpc/client";
import ShowModal from "./ShowModal";


export default function ShowList({ shows }: { shows: CompleteShow[] }) {
  const { data: s } = trpc.shows.getShows.useQuery(undefined, {
    initialData: { shows },
    refetchOnMount: false,
  });

  if (s.shows.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.shows.map((show) => (
        <Show show={show} key={show.id} />
      ))}
    </ul>
  );
}

const Show = ({ show }: { show: CompleteShow }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{show.name}</div>
      </div>
      <ShowModal show={show} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No shows
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new show.
      </p>
      <div className="mt-6">
        <ShowModal emptyState={true} />
      </div>
    </div>
  );
};

