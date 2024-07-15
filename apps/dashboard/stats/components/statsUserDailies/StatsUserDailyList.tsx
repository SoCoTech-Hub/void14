"use client";
import { CompleteStatsUserDaily } from "@soco/stats-db/schema/statsUserDailies";
import { trpc } from "@/lib/trpc/client";
import StatsUserDailyModal from "./StatsUserDailyModal";


export default function StatsUserDailyList({ statsUserDailies }: { statsUserDailies: CompleteStatsUserDaily[] }) {
  const { data: s } = trpc.statsUserDailies.getStatsUserDailies.useQuery(undefined, {
    initialData: { statsUserDailies },
    refetchOnMount: false,
  });

  if (s.statsUserDailies.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.statsUserDailies.map((statsUserDaily) => (
        <StatsUserDaily statsUserDaily={statsUserDaily} key={statsUserDaily.id} />
      ))}
    </ul>
  );
}

const StatsUserDaily = ({ statsUserDaily }: { statsUserDaily: CompleteStatsUserDaily }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{statsUserDaily.courseId}</div>
      </div>
      <StatsUserDailyModal statsUserDaily={statsUserDaily} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No stats user dailies
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new stats user daily.
      </p>
      <div className="mt-6">
        <StatsUserDailyModal emptyState={true} />
      </div>
    </div>
  );
};

