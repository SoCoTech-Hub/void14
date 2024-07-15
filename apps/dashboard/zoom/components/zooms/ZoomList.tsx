"use client";
import { CompleteZoom } from "@soco/zoom-db/schema/zooms";
import { trpc } from "@/lib/trpc/client";
import ZoomModal from "./ZoomModal";


export default function ZoomList({ zooms }: { zooms: CompleteZoom[] }) {
  const { data: z } = trpc.zooms.getZooms.useQuery(undefined, {
    initialData: { zooms },
    refetchOnMount: false,
  });

  if (z.zooms.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {z.zooms.map((zoom) => (
        <Zoom zoom={zoom} key={zoom.id} />
      ))}
    </ul>
  );
}

const Zoom = ({ zoom }: { zoom: CompleteZoom }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{zoom.email}</div>
      </div>
      <ZoomModal zoom={zoom} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No zooms
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new zoom.
      </p>
      <div className="mt-6">
        <ZoomModal emptyState={true} />
      </div>
    </div>
  );
};

