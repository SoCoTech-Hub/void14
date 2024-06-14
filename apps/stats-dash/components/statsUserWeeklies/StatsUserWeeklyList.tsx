"use client";
import { CompleteStatsUserWeekly } from "@/lib/db/schema/statsUserWeeklies";
import { trpc } from "@/lib/trpc/client";
import StatsUserWeeklyModal from "./StatsUserWeeklyModal";


export default function StatsUserWeeklyList({ statsUserWeeklies }: { statsUserWeeklies: CompleteStatsUserWeekly[] }) {
  const { data: s } = trpc.statsUserWeeklies.getStatsUserWeeklies.useQuery(undefined, {
    initialData: { statsUserWeeklies },
    refetchOnMount: false,
  });

  if (s.statsUserWeeklies.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.statsUserWeeklies.map((statsUserWeekly) => (
        <StatsUserWeekly statsUserWeekly={statsUserWeekly} key={statsUserWeekly.id} />
      ))}
    </ul>
  );
}

const StatsUserWeekly = ({ statsUserWeekly }: { statsUserWeekly: CompleteStatsUserWeekly }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{statsUserWeekly.courseId}</div>
      </div>
      <StatsUserWeeklyModal statsUserWeekly={statsUserWeekly} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No stats user weeklies
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new stats user weekly.
      </p>
      <div className="mt-6">
        <StatsUserWeeklyModal emptyState={true} />
      </div>
    </div>
  );
};

