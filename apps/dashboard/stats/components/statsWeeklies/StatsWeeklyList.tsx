"use client";
import { CompleteStatsWeekly } from "@soco/stats-db/schema/statsWeeklies";
import { trpc } from "@/lib/trpc/client";
import StatsWeeklyModal from "./StatsWeeklyModal";


export default function StatsWeeklyList({ statsWeeklies }: { statsWeeklies: CompleteStatsWeekly[] }) {
  const { data: s } = trpc.statsWeeklies.getStatsWeeklies.useQuery(undefined, {
    initialData: { statsWeeklies },
    refetchOnMount: false,
  });

  if (s.statsWeeklies.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.statsWeeklies.map((statsWeekly) => (
        <StatsWeekly statsWeekly={statsWeekly} key={statsWeekly.id} />
      ))}
    </ul>
  );
}

const StatsWeekly = ({ statsWeekly }: { statsWeekly: CompleteStatsWeekly }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{statsWeekly.courseId}</div>
      </div>
      <StatsWeeklyModal statsWeekly={statsWeekly} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No stats weeklies
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new stats weekly.
      </p>
      <div className="mt-6">
        <StatsWeeklyModal emptyState={true} />
      </div>
    </div>
  );
};

