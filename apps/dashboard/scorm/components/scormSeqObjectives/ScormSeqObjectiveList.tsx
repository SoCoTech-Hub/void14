"use client";
import { CompleteScormSeqObjective } from "@soco/scorm-db/schema/scormSeqObjectives";
import { trpc } from "@/lib/trpc/client";
import ScormSeqObjectiveModal from "./ScormSeqObjectiveModal";


export default function ScormSeqObjectiveList({ scormSeqObjectives }: { scormSeqObjectives: CompleteScormSeqObjective[] }) {
  const { data: s } = trpc.scormSeqObjectives.getScormSeqObjectives.useQuery(undefined, {
    initialData: { scormSeqObjectives },
    refetchOnMount: false,
  });

  if (s.scormSeqObjectives.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scormSeqObjectives.map((scormSeqObjective) => (
        <ScormSeqObjective scormSeqObjective={scormSeqObjective} key={scormSeqObjective.scormSeqObjective.id} />
      ))}
    </ul>
  );
}

const ScormSeqObjective = ({ scormSeqObjective }: { scormSeqObjective: CompleteScormSeqObjective }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scormSeqObjective.scormSeqObjective.minNormalizedMeasure}</div>
      </div>
      <ScormSeqObjectiveModal scormSeqObjective={scormSeqObjective.scormSeqObjective} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No scorm seq objectives
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new scorm seq objective.
      </p>
      <div className="mt-6">
        <ScormSeqObjectiveModal emptyState={true} />
      </div>
    </div>
  );
};

