"use client";
import { CompleteScorm } from "@soco/scorm-db/schema/scorms";
import { trpc } from "@/lib/trpc/client";
import ScormModal from "./ScormModal";


export default function ScormList({ scorms }: { scorms: CompleteScorm[] }) {
  const { data: s } = trpc.scorms.getScorms.useQuery(undefined, {
    initialData: { scorms },
    refetchOnMount: false,
  });

  if (s.scorms.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scorms.map((scorm) => (
        <Scorm scorm={scorm} key={scorm.id} />
      ))}
    </ul>
  );
}

const Scorm = ({ scorm }: { scorm: CompleteScorm }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scorm.auto}</div>
      </div>
      <ScormModal scorm={scorm} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No scorms
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new scorm.
      </p>
      <div className="mt-6">
        <ScormModal emptyState={true} />
      </div>
    </div>
  );
};

