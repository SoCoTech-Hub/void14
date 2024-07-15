"use client";
import { CompleteScale } from "@soco/scale-db/schema/scales";
import { trpc } from "@/lib/trpc/client";
import ScaleModal from "./ScaleModal";


export default function ScaleList({ scales }: { scales: CompleteScale[] }) {
  const { data: s } = trpc.scales.getScales.useQuery(undefined, {
    initialData: { scales },
    refetchOnMount: false,
  });

  if (s.scales.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scales.map((scale) => (
        <Scale scale={scale} key={scale.id} />
      ))}
    </ul>
  );
}

const Scale = ({ scale }: { scale: CompleteScale }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scale.courseId}</div>
      </div>
      <ScaleModal scale={scale} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No scales
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new scale.
      </p>
      <div className="mt-6">
        <ScaleModal emptyState={true} />
      </div>
    </div>
  );
};

