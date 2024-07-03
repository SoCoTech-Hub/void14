"use client";
import { CompleteScormScoe } from "@/lib/db/schema/scormScoes";
import { trpc } from "@/lib/trpc/client";
import ScormScoeModal from "./ScormScoeModal";


export default function ScormScoeList({ scormScoes }: { scormScoes: CompleteScormScoe[] }) {
  const { data: s } = trpc.scormScoes.getScormScoes.useQuery(undefined, {
    initialData: { scormScoes },
    refetchOnMount: false,
  });

  if (s.scormScoes.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scormScoes.map((scormScoe) => (
        <ScormScoe scormScoe={scormScoe} key={scormScoe.scormScoe.id} />
      ))}
    </ul>
  );
}

const ScormScoe = ({ scormScoe }: { scormScoe: CompleteScormScoe }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scormScoe.scormScoe.identifier}</div>
      </div>
      <ScormScoeModal scormScoe={scormScoe.scormScoe} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No scorm scoes
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new scorm scoe.
      </p>
      <div className="mt-6">
        <ScormScoeModal emptyState={true} />
      </div>
    </div>
  );
};

