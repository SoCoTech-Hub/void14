"use client";
import { CompleteGradingArea } from "@soco/grade-db/schema/gradingAreas";
import { trpc } from "@/lib/trpc/client";
import GradingAreaModal from "./GradingAreaModal";


export default function GradingAreaList({ gradingAreas }: { gradingAreas: CompleteGradingArea[] }) {
  const { data: g } = trpc.gradingAreas.getGradingAreas.useQuery(undefined, {
    initialData: { gradingAreas },
    refetchOnMount: false,
  });

  if (g.gradingAreas.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradingAreas.map((gradingArea) => (
        <GradingArea gradingArea={gradingArea} key={gradingArea.id} />
      ))}
    </ul>
  );
}

const GradingArea = ({ gradingArea }: { gradingArea: CompleteGradingArea }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradingArea.activeMethod}</div>
      </div>
      <GradingAreaModal gradingArea={gradingArea} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grading areas
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grading area.
      </p>
      <div className="mt-6">
        <GradingAreaModal emptyState={true} />
      </div>
    </div>
  );
};

